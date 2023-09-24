"use client";

import clsx from "clsx";
import S from "@/styles/page.module.scss";
import React, {CSSProperties, Dispatch, FC, SetStateAction} from "react";
import {User} from "@/api/users";
import {UserItemData} from "@/app/components/UserItemData";

type UserItemProps = {
    style?: CSSProperties;
    user: User
    selectedUser: User | null;
    setSelectedUser: Dispatch<SetStateAction<User | null>>
}

export const UserItem: FC<UserItemProps> = ({
                                                user,
                                                selectedUser,
                                                setSelectedUser,
                                                style
                                            }) => {
    return (
        <ol
            style={{...style, paddingLeft: 0}}
        >
            <UserItemData
                onClick={() => {
                    setSelectedUser(prev => {
                        return prev?.id === user.id ? null : user;
                    })
                }}
                className={clsx(S.ListItem, selectedUser?.id === user.id && S.ActiveListItem)}
                user={user}
            />
        </ol>
    );
}
