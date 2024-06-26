import React from "react";

import styled from "styled-components/native";


const Text = styled.Text`
   color: white;
  opacity: .8;
  font-size: 12px;
`

interface VotesProps {
  votes: number;
}


const Votes: React.FC<VotesProps>  = ({votes}) => (
  <Text>{votes > 0 ? `⭐️ ${votes.toFixed(1)} / 10` : 'Coming soon'}</Text>
)


export default Votes