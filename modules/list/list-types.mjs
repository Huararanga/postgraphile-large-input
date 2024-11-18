import { gql } from "postgraphile/utils";

export const ListTypes = gql`
  enum EditableLists {
    REASON_REMOVE
    REASON_REMOVE_PLASMA
    DRAW_FINISHED_TYPE
  }

  input MoveListAdditionalFieldValue {
    field: String!
    value: String!
  }

  input MoveListInputData {
    id: Int
    name: String!
    orderNumber: Int!
    isValid: Boolean!
    additionalFields: [MoveListAdditionalFieldValue!]
  }

  input UpdateListByMovementsInput {
    moveItems: [MoveListInputData!]!
    listName: EditableLists!
  }

  type UpdateListByMovementsPayload {
    success: Boolean
  }

  extend type Mutation {
    updateListByMovements(
      input: UpdateListByMovementsInput!
    ): UpdateListByMovementsPayload
  }
`;
