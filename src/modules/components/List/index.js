import React from 'react'
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText, List as MuiList
} from "@mui/material";

// fields - which fields of the list item should be displayed
export const List = ({list, fields, avatar}) => {
    return (<MuiList dense={true}>
        {
            list.map(
                (item) => {
                    return (
                        <ListItem key={item[fields[0] || '']}>
                            <ListItemAvatar>
                                <Avatar>
                                    <img src={item[avatar]} alt='avatar'/>
                                </Avatar>
                            </ListItemAvatar>
                            {
                                fields.map((field, index) => {
                                    return <ListItemText
                                        key={`${item[fields[0] || '']}-${index}`} // for uniqueness
                                        primary={item[field]}
                                    />
                                })
                            }
                        </ListItem>
                    )
                }
            )
        }
    </MuiList>)
}
