import styled from "styled-components/native";

interface propsType {
    color?: string,
    height?: number,
}

const Font = styled.Text<propsType>`
    color: ${props => props.color || "white"};
    /* height: ${props => props.height + "px" || ""}; */
`

export const H1 = styled(Font)`
    font-size: 32px;
    font-weight: bold;
`
export const H2 = styled(Font)`
    font-size: 24px;
    font-weight: bold;
`
export const H3 = styled(Font)`
    font-size: 20px;
    font-weight: bold;
`
export const H4 = styled(Font)`
    font-size: 16px;
    font-weight: bold;
`

export const P1 = styled(Font)`
    font-size: 16px;
`
export const P2 = styled(Font)`
    font-size: 16px;
`