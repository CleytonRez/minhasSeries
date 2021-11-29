// Imports.
import React, { useState } from 'react';
import {
    Navbar,
    NavbarBrand,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler
} from "reactstrap"
import { Link } from 'react-router-dom'

// Componente Header retornado o Menu do Cabecalho.
const Header = () => {

    // Estado com open que seta se o Toggler aparece ou nao false/true.
    const [open, setOpen] = useState(false)

    // funcao que altera de False -> True e de True -> False.
    const toggle = () => {
        setOpen(!open)
    }

    // Retorna o Cabeçalho.
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand tag={Link} to="/">Minhas Séries</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={open} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/generos">Genêros</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default Header;