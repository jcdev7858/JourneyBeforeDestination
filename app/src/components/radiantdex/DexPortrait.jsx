import styles from "./DexPortrait.module.css";
import OrderGlyph from "../OrderGlyph";

const DexPortrait = ({ char }) => {
  return (
    <div className={styles.dexPortrait}>
      {char.image !== null ? (
        <img src={char.image} alt={`${char.name} - ${char.role}`} />
      ) : (
        <div className={styles.glyphWrapper}>
          <OrderGlyph order={char.orderId} h={90} variant="block" />
        </div>
      )}
      {char.imgCaption && (
        <div className={styles.captionWrap}>
          <p className={styles.caption}>{char.imgCaption}</p>
        </div>
      )}
    </div>
  );
};

export default DexPortrait;
