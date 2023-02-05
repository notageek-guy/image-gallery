import React, { Fragment } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import styles from "@/styles/gallery.module.css";

export default function Gallery() {
  const router = useRouter();
  const { imageList } = router.query;

  const newList: Array<{
    id: string | undefined;
    url: string | undefined;
  }> = [];
  if (imageList) {
    for (let i = 0; i < imageList.length; i++) {
      newList.push({
        id: uuidv4(),
        url: imageList.at(i),
      });
    }
  }
  return (
    <div className={styles.gallery__section}>
      <h1>Gallery</h1>
      <div className={styles.grid__section}>
        {newList.map(({ id, url }) => {
          return (
            <Fragment key={id}>
              <Image
                className={styles.image}
                src={url as string}
                width={200}
                height={200}
                alt={`Image  ${id} from gallery`}
              />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
