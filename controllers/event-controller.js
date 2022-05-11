const Event = require("../db/models/event");
const User = require("../db/models/user");

module.exports = {
  addEvent: async (req, res) => {
    try {
      const { title, description, ownerId, start, end, participants } =
        req.body;

      const newEvent = await Event.query().insert({
        title,
        description,
        ownerId,
        start,
        end,
        // calendarId,
      });

      if (participants) {
        await Event.relatedQuery("participants")
          .for(newEvent.id)
          .relate([...participants, ownerId]);
      }

      res.json(newEvent);
    } catch (e) {
      res.json(e);
      res.status(500);
    }
  },
  getEventsByUser: async (req, res) => {
    try {
      const { userId } = req.params;

      const currentUser = User.query().where({ id: userId });

      const events = await User.relatedQuery("events")
        .for(currentUser)
        .withGraphFetched("participants");

      res.json(events);
    } catch (e) {
      res.json(e);
      res.status(500);
    }
  },
};
