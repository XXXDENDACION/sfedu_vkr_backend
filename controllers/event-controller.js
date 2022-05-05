const Event = require("../db/models/event");
const User = require("../db/models/user");

module.exports = {
  addEvent: async (req, res) => {
    try {
      const { title, description, ownerId, calendarId, participants } =
        req.body;

      const newEvent = await Event.query().insert({
        title,
        description,
        ownerId,
        // calendarId,
      });

      if (participants) {
        await Event.relatedQuery("users").for(newEvent.id).relate(participants);
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

      const events = await User.relatedQuery("events").for(currentUser);

      res.json(events);
    } catch (e) {
      res.json(e);
      res.status(500);
    }
  },
};
