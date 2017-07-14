const router = require('express').Router();
const Student = require('../../db/models/students');
const Campus = require('../../db/models/campuses');

module.exports = router;

router.get('/', function (req, res, next) {
	Campus.findAll({
		order: [['name', 'ASC']]
	})
		.then(campuses => res.json(campuses))
		.catch(next);
});

router.get('/:id', function (req, res, next) {
	Campus.findOne({
		where: { id: +req.params.id },
		include: [{ model: Student }]
	})
		.then(campus => res.json(campus))
		.catch(next);
});

router.post('/', function (req, res, next) {
	Campus.findOrCreate({
		where: {
			name: req.body.name
		},
		defaults: {
			dean: req.body.dean,
			image: req.body.image
		}
	})
		.then(campus => res.json(campus))
		.catch(next);
});

router.put('/:id', function (req, res, next) {
	Campus.update({
		name: req.body.name,
		dean: req.body.dean,
		image: req.body.image
	}, {
			where: {
				id: req.params.id,
			},
			returning: true
		}
	)
		.then(campus => res.json(campus))
		.catch(next);
});

router.delete('/:id', function (req, res, next) {
	Campus.destroy({
		where: { id: req.params.id }
	})
		.then(() => res.status(204).end())
		.catch(next);
});
