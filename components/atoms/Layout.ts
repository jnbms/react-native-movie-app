import styled from "styled-components/native";

interface props {
    align?: string,
    justify?: string,
    height?: number,
    width?: number
}

const layout = styled.View<props>(props => ({
    alignItems: props.align,
    justifyContent: props.justify,
    height: props.height ? props.height : "",
    width: props.width? props.width : "",
}))

export const Row = styled(layout)`
    display: flex;
    flex-direction: row;
    align-items: center;
`
export const Column = styled(layout)`
    display: flex;
    flex-direction: column;
    align-items: center;
`
