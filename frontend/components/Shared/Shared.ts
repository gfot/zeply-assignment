import styled from 'styled-components'

export const Card = styled.div`
  max-width: 700px;
  margin: 32px auto;
  border-radius: 8px;
  padding: 16px;
  background-color: hsl(50deg 100% 40% / 0.3);
  border: none;
`

export const ResultWrapper = styled(Card)`
  background-color: hsl(50deg 100% 40% / 0.3);
`

export const Title = styled.h1`
  text-transform: capitalize;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

export const ResultList = styled.ul`
  list-style-type: none;
`

export const ListItem = styled.li`
  font-size: 1.3rem;
  word-break: break-all;
  gap: 4px;
`

export const Label = styled.span`
  font-weight: 600;
`

export const Value = styled.span`
  letter-spacing: 0.06rem;
`
