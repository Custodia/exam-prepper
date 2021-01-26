import { useHistory } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

function AppNavbar() {
  let history = useHistory()

  const handleNavigate = (url) => {
    return () => {
      history.push(url)
    }
  }

  return (
    <Navbar expand="sm" bg="dark" variant="dark">
      <Navbar.Brand onClick={handleNavigate('/')}>Exam Prepper</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <NavDropdown title="Problems">
            <NavDropdown.Item onClick={handleNavigate('/problems')}>All problems</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleNavigate('/problems/employee-count')}>Employee count problem</NavDropdown.Item>
            <NavDropdown.Item onClick={handleNavigate('/problems/worker-count')}>Worker count problem</NavDropdown.Item>
            <NavDropdown.Item onClick={handleNavigate('/problems/fixed-costs')}>Fixed costs problem</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AppNavbar
