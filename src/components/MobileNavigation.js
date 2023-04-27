import React, { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';

const NavButton = styled(Button)(({ theme }) => `
    z-index: ${theme.zIndex.modal + 1};
`)

const NavItem = styled(Box, {
    shouldForwardProp: prop => prop !== 'visible'
})(({ theme, visible }) => `
    ${visible
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
    const { name, subMenus } = menuItem
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
                {
                    ...menuItem.subMenus
                        ? {}
                        : {
                            component: Link,
                            to: menuItem.link,
                        }
                }
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

export default function MobileNavigation({ menus = [], buttonStyle = {} }) {
    const location = useLocation()
    const [visible, setVisible] = useState("")
    const [mobileOpen, setMobileOpen] = useState(false)
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

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

    const drawerWidth = 240;
    const container = window !== undefined ? () => window.document.body : undefined;

    useEffect(() => {
        if (mobileOpen) {
            handleDrawerToggle()
            setVisible("")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location?.pathname])
    return (
        <>
            <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 0, color: 'primary.main', display: { md: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                className="mobile-nav"
            >
                {menuItems}
            </Drawer>
        </>
    )
}
