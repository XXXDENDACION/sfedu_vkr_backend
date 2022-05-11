const { Model } = require("objection");

class Event extends Model {
  static get tableName() {
    return "events";
  }

  static get relationMappings() {
    const User = require("./user");
    return {
      participants: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "events.id",
          through: {
            from: "participantsOfEvents.eventId",
            to: "participantsOfEvents.userId",
          },
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Event;
