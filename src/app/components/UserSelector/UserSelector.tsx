"use client";

import React, {useState} from "react";
import S from "@/styles/page.module.scss";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import {FixedSizeList as List} from "react-window";
import {useGetUsersInfinite, User} from "@/api/users";
import {UserItem} from "@/app/components/Item";

export const UserSelector = () => {
    const [checkItem, setCheckItem] = useState<number | null>(null)
    const {data} = useGetUsersInfinite({
        page: 1,
        limit: 50
    })
    const userList = data?.pages?.reduce((acc, v) => {
        return [
            ...acc,
            ...v.data,
        ];
    }, [] as User[]);

    const isItemLoadedHandler = (index: number) => {
        console.log('in', index)
        return true;
    }
    const loadMoreItemsHandler = (startIndex: number, stopIndex: number) => {
        console.log('startIndex', startIndex)
        console.log('stopIndex', stopIndex)

    }
    return (
        <main className={S.MainContainer}>
            <div className={S.Wrapper}>
                <p className={S.Title}>Users</p>
                <div tabIndex={0} className={S.SelectContainer}/>
                <ul className={S.SelectList}>
                    <InfiniteLoader
                        itemCount={5000}
                        isItemLoaded={isItemLoadedHandler}
                        loadMoreItems={loadMoreItemsHandler}>
                        {({onItemsRendered, ref}) => (
                            <AutoSizer>
                                {({height, width}) => (
                                    <List
                                        itemData={userList}
                                        ref={ref}
                                        onItemsRendered={onItemsRendered}
                                        height={height}
                                        itemCount={userList?.length || 0}
                                        itemSize={30}
                                        width={width}>
                                        {({data, index, style}) => {
                                            const user = data[index];
                                            return (
                                                <UserItem style={style} user={user} selectedUser={checkItem} setSelectedUser={setCheckItem}/>
                                            );
                                        }}
                                    </List>
                                )}
                            </AutoSizer>
                        )}
                    </InfiniteLoader>
                    {/*<List*/}
                    {/*    itemSize={30}*/}
                    {/*    height={160}*/}
                    {/*    itemCount={30}*/}
                    {/*    width={361}*/}
                    {/*>*/}
                    {/*    {Item}*/}
                    {/*</List>*/}

                </ul>
            </div>
        </main>
    )
}
