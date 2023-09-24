"use client";

import clsx from "clsx";
import S from "@/styles/page.module.scss";
import React, {Dispatch, FC, SetStateAction} from "react";
import {User} from "@/api/users";

type UserItemProps = {
    style: any;
    user: User
    selectedUser: number | null;
    setSelectedUser: Dispatch<SetStateAction<number | null>>
}

export const UserItem: FC<UserItemProps> = ({user, selectedUser, setSelectedUser, style}) => {
    return (
        <ol
            style={{...style, paddingLeft: 0}}
        >
            <div
                onClick={() => {
                    setSelectedUser(prev => {
                        return prev === user.id ? null : user.id;
                    })
                }}
                className={clsx(S.ListItem, selectedUser === user.id && S.ActiveListItem)}>

                <p className={S.ItemIcon}>{user.last_name.slice(0, 1)}</p>
                <p className={S.ItemTitle}>{user.last_name} {user.first_name}, {user.job}</p>
            </div>
        </ol>
    );
}
