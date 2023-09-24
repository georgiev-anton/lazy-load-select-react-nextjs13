import React, {CSSProperties, FC} from "react";
import S from "@/styles/page.module.scss";

type LoaderProps = {
    style: CSSProperties
}

export const Loader: FC<LoaderProps> = ({style}) => {
    return (
        <ol
            style={style}
            className={S.ListItem}
        >
            <p className={S.ItemTitle}>Loading...</p>
        </ol>
    );
}
