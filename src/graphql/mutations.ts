/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createList = /* GraphQL */ `
  mutation CreateList(
    $input: CreateListInput!
    $condition: ModelListConditionInput
  ) {
    createList(input: $input, condition: $condition) {
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
export const updateList = /* GraphQL */ `
  mutation UpdateList(
    $input: UpdateListInput!
    $condition: ModelListConditionInput
  ) {
    updateList(input: $input, condition: $condition) {
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
export const deleteList = /* GraphQL */ `
  mutation DeleteList(
    $input: DeleteListInput!
    $condition: ModelListConditionInput
  ) {
    deleteList(input: $input, condition: $condition) {
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
export const createWord = /* GraphQL */ `
  mutation CreateWord(
    $input: CreateWordInput!
    $condition: ModelWordConditionInput
  ) {
    createWord(input: $input, condition: $condition) {
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
export const updateWord = /* GraphQL */ `
  mutation UpdateWord(
    $input: UpdateWordInput!
    $condition: ModelWordConditionInput
  ) {
    updateWord(input: $input, condition: $condition) {
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
export const deleteWord = /* GraphQL */ `
  mutation DeleteWord(
    $input: DeleteWordInput!
    $condition: ModelWordConditionInput
  ) {
    deleteWord(input: $input, condition: $condition) {
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
