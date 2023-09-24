import clsx, {ClassValue} from "clsx";
import S from "@/styles/page.module.scss";
import React, {FC} from "react";
import {User} from "@/api/users";

type UserItemDataProps = {
    user: User;
    onClick?: () => void;
    className?: string;
}

export const UserItemData: FC<UserItemDataProps> = ({user, onClick, className}) => {
    return (
        <div
            onClick={onClick}
            className={clsx(S.ListItemData, className)}
        >
            <p className={S.ItemIcon}>{user.last_name.slice(0, 1)}</p>
            <p className={S.ItemTitle}>{user.last_name} {user.first_name}, {user.job}</p>
        </div>
    )
}
