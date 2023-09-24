"use client";

import React, {useState} from "react";
import S from "@/styles/page.module.scss";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import {VariableSizeList as List} from "react-window";
import {useGetUsersInfinite, User, USERS_BASE_LIMIT} from "@/api/users";
import {UserItem} from "../UserItem";
import {Loader} from "@/app/components/Loader";
import {UserItemData} from "@/app/components/UserItemData";

export const UserSelector = () => {
    const [isListVisible, setIsListVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const {
        data,
        isFetchingNextPage,
        fetchNextPage
    } = useGetUsersInfinite({
        page: 1,
        limit: USERS_BASE_LIMIT
    })

    const userList = data?.pages?.reduce((acc, v) => {
        return [
            ...acc,
            ...v.data,
        ];
    }, [] as User[]);

    const hasNextPage = (userList?.length || 0) < (data?.pages?.[0]?.meta?.total || 0);

    const usersTotal = hasNextPage ? (userList?.length || 0) + 1 : userList?.length || 0;

    const loadMoreItems = () => {
        if (isFetchingNextPage) {
            return;
        }

        fetchNextPage();
    }

    const isItemLoaded = (index: number) => {
        return !hasNextPage || (index < (userList?.length || 0));
    }

    return (
        <div>
            <p className={S.Title}>Users</p>
            <div
                tabIndex={0}
                className={S.SelectContainer}
                onClick={() => setIsListVisible(prev=>!prev)}
                onBlur={() => setIsListVisible(false)}
            >
                {!!selectedUser && !!selectedUser &&
                    <UserItemData
                        user={selectedUser}
                    />
                }
            </div>
            <ul className={S.SelectList}
                style={{ opacity: isListVisible ? 1 : 0 }}
                onMouseDown={e => e.preventDefault()}
            >
                {isListVisible && <InfiniteLoader
                    itemCount={usersTotal}
                    isItemLoaded={isItemLoaded}
                    loadMoreItems={loadMoreItems as any}>
                    {({onItemsRendered, ref}) => (
                        <AutoSizer>
                            {({height, width}) => (
                                <List
                                    itemData={userList}
                                    ref={ref}
                                    onItemsRendered={onItemsRendered}
                                    height={height}
                                    itemCount={usersTotal}
                                    width={width}
                                    itemSize={(index) => {
                                        const user = userList?.[index];
                                        if (user) {
                                            const text = `${user.last_name} ${user.first_name}, ${user.job}`;
                                            if (text.length > 42) {
                                                return 44;
                                            }
                                        }
                                        return 32;
                                    }}
                                >
                                    {({data, index, style}) => {
                                        const user = data?.[index];
                                        if (!user) {
                                            return <Loader style={style}/>
                                        }
                                        return (
                                            <UserItem
                                                style={style}
                                                user={user}
                                                selectedUser={selectedUser}
                                                setSelectedUser={setSelectedUser}/>
                                        );
                                    }}
                                </List>
                            )}
                        </AutoSizer>
                    )}
                </InfiniteLoader>}
            </ul>
        </div>
    )
}
