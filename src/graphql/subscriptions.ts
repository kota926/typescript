/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String!) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String!) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String!) {
    onDeleteUser(owner: $owner) {
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
export const onCreateList = /* GraphQL */ `
  subscription OnCreateList($owner: String!) {
    onCreateList(owner: $owner) {
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
export const onUpdateList = /* GraphQL */ `
  subscription OnUpdateList($owner: String!) {
    onUpdateList(owner: $owner) {
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
export const onDeleteList = /* GraphQL */ `
  subscription OnDeleteList($owner: String!) {
    onDeleteList(owner: $owner) {
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
export const onCreateWord = /* GraphQL */ `
  subscription OnCreateWord($owner: String!) {
    onCreateWord(owner: $owner) {
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
export const onUpdateWord = /* GraphQL */ `
  subscription OnUpdateWord($owner: String!) {
    onUpdateWord(owner: $owner) {
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
export const onDeleteWord = /* GraphQL */ `
  subscription OnDeleteWord($owner: String!) {
    onDeleteWord(owner: $owner) {
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
