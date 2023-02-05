import Head from "next/head";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState, useEffect, Fragment } from "react";
import { storage } from "@/config/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const randomFileName = file?.name + uuidv4();
  const [previewLink, setPreviewLink] = useState<string | ArrayBuffer | null>(
    null
  );
  const [imageList, setImageList] = useState<any[]>([]);
  const imageListRef = ref(storage, `images/`);
  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  const notify = () => toast.success(`Image Uploaded Successfully`);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLink(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const fileUpload = () => {
    if (file === null) return;
    const imageRef = ref(storage, `images/${randomFileName}}`);
    uploadBytes(imageRef, file)
      .then((snapshot) => {
        notify();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>Image Gallery</title>
        <meta name="description" content="Image Gallery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <ProtectedRoute>
      <main className={styles.main}>
        <h1>Image Gallery</h1>
        <section className={styles.input__section}>
          <div>
            <input
              onChange={handleFileChange}
              className={styles.input__file}
              type="file"
              name="image"
              id="image"
              accept="image/*"
            />
            <label htmlFor="image" className={styles.input__label}>
              Choose Image
            </label>
          </div>
          <div className={styles.image__section}>
            <div className={styles.image__flex}>
              {previewLink && (
                <Fragment>
                  <Image
                    src={previewLink?.toString()}
                    className={styles.image__preview}
                    alt="image preview"
                    width={300}
                    height={300}
                  />

                  <button onClick={fileUpload} className={styles.upload__btn}>
                    Upload
                  </button>
                  <Toaster />
                </Fragment>
              )}
            </div>
          </div>
        </section>
        <section className={styles.gallery__section}>
          {file && (
            <div className={styles.gallery__flex}>
              <Link
                href={{
                  pathname: "/gallery",
                  query: { imageList: imageList },
                }}
                passHref
              >
                <button className={styles.gallery__btn}>View Gallery</button>
              </Link>
            </div>
          )}
        </section>
      </main>
    </ProtectedRoute>
    </>
  );
}
