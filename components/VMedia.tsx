
import React from "react"
import styled from "styled-components/native"
import Poster from "./Poster"
import Votes from "./Votes"



const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`

const Title = styled.Text`
  color: white;
  font-size:14px;
  margin-top: 7px;
  margin-bottom: 5px;
`


const Vote = styled.Text`
  color: white;
  opacity: .8;
  font-size: 12px;
`



interface VMovieProps {
  posterPath: string
  title: string
  voteAverage: number
}


const VMovie: React.FC<VMovieProps> = ({
  posterPath,
  title,
  voteAverage
}) => (
  <Movie>
          <Poster  posterPath={posterPath}/>
          <Title>
            {title.slice(0,13)}
            {title.length > 13 ? "..." : null}
          </Title>
          <Votes votes={voteAverage}/>
        </Movie>
)

export default VMovie