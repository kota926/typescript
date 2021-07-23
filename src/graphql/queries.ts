/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      categories
      lists {
        items {
          id
          title
          userID
          categories
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        categories
        lists {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getList = /* GraphQL */ `
  query GetList($id: ID!) {
    getList(id: $id) {
      id
      title
      userID
      user {
        id
        name
        categories
        lists {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      categories
      words {
        items {
          id
          listID
          question
          answer
          english
          japanese
          translation
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listLists = /* GraphQL */ `
  query ListLists(
    $filter: ModelListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        userID
        user {
          id
          name
          categories
          createdAt
          updatedAt
          owner
        }
        categories
        words {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getWord = /* GraphQL */ `
  query GetWord($id: ID!) {
    getWord(id: $id) {
      id
      listID
      list {
        id
        title
        userID
        user {
          id
          name
          categories
          createdAt
          updatedAt
          owner
        }
        categories
        words {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      question
      answer
      english
      japanese
      translation
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listWords = /* GraphQL */ `
  query ListWords(
    $filter: ModelWordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        listID
        list {
          id
          title
          userID
          categories
          createdAt
          updatedAt
          owner
        }
        question
        answer
        english
        japanese
        translation
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const searchLists = /* GraphQL */ `
  query SearchLists(
    $filter: SearchableListFilterInput
    $sort: SearchableListSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchLists(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        title
        userID
        user {
          id
          name
          categories
          createdAt
          updatedAt
          owner
        }
        categories
        words {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
      total
    }
  }
`;
export const searchWords = /* GraphQL */ `
  query SearchWords(
    $filter: SearchableWordFilterInput
    $sort: SearchableWordSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchWords(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        listID
        list {
          id
          title
          userID
          categories
          createdAt
          updatedAt
          owner
        }
        question
        answer
        english
        japanese
        translation
        createdAt
        updatedAt
        owner
      }
      nextToken
      total
    }
  }
`;
