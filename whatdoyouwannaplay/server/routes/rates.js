const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { checkBody, isAdmin } = require('../middlewares');

// POST /api/rates/:id_game => transaction SQL Transactions_Rate_Game (id de game)
router.post('/:id_game', checkBody(['id_user', 'rating']), (req, res) => {
    const id_game = req.params.id_game;
    const { id_user, rating } = req.body;
    db.query('SELECT * FROM View_Games WHERE id_game = ?', [id_game], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ error: 'Jeu introuvable' });

        db.query('CALL Transactions_Rate_Game(?, ?, ?)', [id_game, id_user, rating], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Évaluation enregistrée' });
        });
    });
});

// DELETE /api/rates/:id_game => procédure stockée Procedure_Delete_Rate
router.delete('/:id_game', isAdmin, (req, res) => {
    const id_rate = req.params.id;

    db.query('CALL Procedure_Delete_Rate(?)', [id_rate], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Évaluation supprimée' });
    });
});

module.exports = router;
