const router = require('express').Router();
const Student = require('../../db/models/students');
const Campus = require('../../db/models/campuses');

module.exports = router;

router.get('/', function (req, res, next) {
	Student.findAll()
		.then(students => res.json(students))
		.catch(next);
});

router.get('/:id', function (req, res, next) {
	Student.findById(req.params.id)
		.then(student => res.json(student))
		.catch(next);
});

router.post('/', function (req, res, next) {
	Student.findOrCreate({
		where: {
			name: req.body.name,
		},
		defaults: {
			email: req.body.email
		}
	})
		.then(student => res.json(student))
		.catch(next);
});

router.put('/', function (req, res, next) {
	Student.update({
		name: req.body.name,
		email: req.body.email
	}, {
			where: {
				name: req.body.name,
				email: req.body.email
			}
		}
	)
		.then(student => res.json(student))
		.catch(next);
});

router.delete('/:id', function (req, res, next) {
  Student.destroy({
		where: { id: req.params.id }
	})
    .then(() => res.status(204).end())
    .catch(next);
});
