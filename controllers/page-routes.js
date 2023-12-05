const router = require('express').Router();
const { Food, Exercise, ExerciseSets } = require('../models');

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/exercises', async (req, res) => {
    const date = req.query.date ? new Date(req.query.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
 // Use provided date or today's date

    try {
        const exerciseData = await Exercise.findAll({
            where: {
                EntryDate: date,
                // Additional conditions, like UserId, can be added here
            },
            include: [{
                model: ExerciseSets,
                as: 'sets'
            }]
        });

        const exercises = exerciseData.map(ex => ex.get({ plain: true }));
        res.render('exercise', { exercises, date }); // Pass the date to the template
    } catch (err) {
      console.log(err);
        res.status(500).send(err);
    }
});

router.get('/post-exercise', (req, res) => {
    try {
        // Render the post-exercise.handlebars template
        res.render('post-exercise', {
            // Pass any additional data needed by the template, if any
        });
    } catch (err) {
        console.error('Error rendering exercise form: ', err);
        res.status(500).send(err);
    }
});

router.post('/api/exercises', async (req, res) => {
    try {
        // Extract data from the request body
        const { name, calories, sets } = req.body;
        const userId = req.session.userId; // Assuming you have user session management

        // Create a new exercise entry
        const newExercise = await Exercise.create({
            Name: name,
            Calories: calories,
            User: userId
            // Add other necessary Exercise fields
        });

        // Associate sets with the newly created exercise
        if (sets && sets.length) {
            const setsData = sets.map(set => ({
                SetNumber: set,
                ExerciseId: newExercise.ExerciseId,
                User: userId
                // Add other necessary ExerciseSets fields
            }));
            await ExerciseSets.bulkCreate(setsData);
        }

        res.redirect('/some-success-page'); // Redirect after successful creation
    } catch (err) {
        console.error('Error in creating exercise: ', err);
        res.status(500).send(err);
    }
});

router.get('/food', async (req, res) => {
  try {
    const dbFoodData = await Food.findAll({});
    const foodData = dbFoodData.map(item => item.get({ plain: true })); // Convert each object to plain data
    res.render('Food', { foodData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// router.get('/food', (req, res) => {

//   res.render('food');
// });

router.get('/usergoals', (req, res) => {
  res.render('usergoals');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/results', (req, res) => {
  res.render('results');
});

module.exports = router;
