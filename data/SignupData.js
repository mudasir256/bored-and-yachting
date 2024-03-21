import { USER_TYPES } from "@/helpers/index";

export const roleMappings = {
    CUSTOMER: {
      id: USER_TYPES.CUSTOMER,
      signUpState: "Renter",
      signUpStateImage: "/content/boat.jpg",
      header: "I'm a renter",
      description: "I'd like to discover and explore over <amount> boats with ease.",
      src: "/content/boat.jpg",
    },
    CAPTAIN: {
      id: USER_TYPES.CAPTAIN,
      signUpState: "Captain",
      signUpStateImage: "/content/yacht_captain.jpeg",
      header: "I'm a captain",
      description: "I'd like to connect with boat owners and renters and make up to $<amount>/hr.",
      src: "/content/yacht_captain.jpeg",
    },
    BOAT_OWNER: {
      id: USER_TYPES.BOAT_OWNER,
      signUpState: "Owner",
      signUpStateImage: "/content/yacht_owner.jpg",
      header: "I'm a boat owner",
      description: "I'd like to connect with boat renters and captains and earn money renting.",
      src: "/content/yacht_owner.jpg",
    },
  };