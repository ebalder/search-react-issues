
import { gql } from '@apollo/client';

export default gql`
query(
  $q:String!,
  $first:Int,
  $last:Int,
  $before:String,
  $after:String){ 
  search(
    query: $q,
    type: ISSUE,
    first: $first,
    last: $last,
    before: $before,
    after: $after,
  ){
    pageInfo{
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    issueCount
    edges {
      cursor
      node {
        ... on Issue {
          id
          title
          url
          labels( first:10 ) {
            totalCount
            nodes {
              color
              id
              description
              name
            }
          }
          updatedAt
        }
      }
    }
  }
}
`;