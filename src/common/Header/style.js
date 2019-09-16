import styled from 'styled-components'
export const FixHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    background: #D8D8D8;
    width: 100%;
    padding: 1rem 1.5rem;
    top: 0;
    z-index:999;
`
export const Logo = styled.div`
    display: flex;
    align-items: center; 
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
    svg{
        margin-right: 5px;
    }
`

export const HeaderAction = styled.div`
    display: flex;
    align-items: center; 
    button{
        margin-left:1rem;
    }
`

export const Button = styled.button`
    display: flex;
    align-items: center; 
    font-weight: 600;    
    cursor: pointer;
    background: #FFFFFF;
    border-radius: 20px;
    text-transform: uppercase;
    font-size: 14px;
    color: #000;
    border: 0;
    font-family: 'Open Sans', sans-serif;
    padding: 0.6rem 1rem;   
    transition: all ease-in-out 0.5s;
    :hover, :focus {
        background: #000;
        outline: none;
        color: #fff;
    }
`
