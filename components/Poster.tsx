import React from 'react'
import styled from 'styled-components/native'
import { buildImgPath } from '../utils'


const Images = styled.Image`
  width: 100px;
  height: 140px;
`


interface PosterProps {
  posterPath: string,
}


const Poster: React.FC<PosterProps> = ({posterPath}) => (
  <Images source={{ uri: buildImgPath(posterPath) }} />
  
)

export default Poster