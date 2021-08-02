/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
  subscription OnUpdateUser {
    onUpdateUser {
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
  subscription OnDeleteUser {
    onDeleteUser {
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
  subscription OnCreateList {
    onCreateList {
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
          answerIndex
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
  subscription OnUpdateList {
    onUpdateList {
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
          answerIndex
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
  subscription OnDeleteList {
    onDeleteList {
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
          answerIndex
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
  subscription OnCreateWord {
    onCreateWord {
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
      answerIndex
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
  subscription OnUpdateWord {
    onUpdateWord {
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
      answerIndex
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
  subscription OnDeleteWord {
    onDeleteWord {
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
      answerIndex
      english
      japanese
      translation
      createdAt
      updatedAt
      owner
    }
  }
`;
