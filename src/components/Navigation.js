import React, { useCallback, useRef, useState } from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';

const NavButton = styled(Button)(({ theme }) => `
    z-index: ${theme.zIndex.modal + 1};
`)

const NavItem = styled(Box, {
    shouldForwardProp: prop => prop !== 'visible'
})(({ theme, visible }) => `
    ${
        visible
            ? `
                > .MuiButton-root {
                    background-color: ${theme.palette.primary.main};
                    color: ${theme.palette.primary.contrastText};
                    border-radius: 0;
                }
            `
            : ''
    }
`)

const DropdownMenuItem = ({
    menuItem,
    visible,
    setVisible,
    buttonStyle,
}) => {
    const { name, link, subMenus } = menuItem
    const buttonRef = useRef(null)

    const showSubMenu = useCallback(() => {
        setVisible(menuItem.name)
    }, [menuItem.name, setVisible])

    const closeSubMenu = useCallback(() => {
        setVisible("")
    }, [setVisible])

    const subMenusNodes = subMenus?.map(subMenuItem => {
        return (
            <MenuItem
                key={subMenuItem.name}
                component={Link}
                to={subMenuItem.link}
                sx={{ minWidth: 170 }}
            >
                {subMenuItem.name}
            </MenuItem>
        )
    })

    return (
        <>
            <NavButton
                id={`menuItem-${name}`}
                ref={buttonRef}
                onMouseLeave={() => {
                    setVisible("")
                }}
                onMouseEnter={() => {
                    if (menuItem.subMenus) {
                        showSubMenu()
                        return
                    }
                }}
                sx={{ py: 2, px: 4, ...buttonStyle }}
                component={Link} 
                to={link}
            >
                {name} {menuItem.subMenus ? <ArrowDropDownIcon /> : null}
            </NavButton>
            <Menu
                PaperProps={{
                    onMouseEnter: () => {
                        showSubMenu()
                    },
                    onMouseLeave: () => {
                        closeSubMenu()
                    },
                    sx: {
                        borderRadius: 0,
                    },
                }}
                anchorEl={buttonRef.current}
                open={visible === menuItem.name}
                onClose={closeSubMenu}
            >
                {subMenusNodes}
            </Menu>
        </>
    )
}

export default function Navigation({ menus = [], buttonStyle = {} }) {
    const [visible, setVisible] = useState("")

    const handleChangeVisibility = useCallback(menuTitle => {
        setVisible(menuTitle)
    }, [])

    const menuItems = menus.map(menuItem => {
        return (
            <NavItem visible={visible === menuItem.name} key={menuItem.name}>
                <DropdownMenuItem
                    menuItem={menuItem}
                    visible={visible}
                    setVisible={handleChangeVisibility}
                    buttonStyle={buttonStyle}
                />
            </NavItem>
        )
    })

    return <Box sx={{ display: { xs: 'none', md: 'flex' } }}>{menuItems}</Box>
}
