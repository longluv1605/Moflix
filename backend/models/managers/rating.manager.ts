import Database from "../../database/database";
import { Manager } from "../../interfaces/interfaces";

class RatingManager implements Manager {
    public getDatas = async (input: { [key: string]: any }) => {
        try {
            let sql: string;
            const movieId = input.movieId;
            const userId = input.userId;

            if (movieId && userId) {
                sql =` 
                    SELECT *,
                    (SELECT title FROM movie WHERE id = movie_id) AS movie_title,
                    (SELECT ROUND(AVG(value), 1) FROM user_rating WHERE movie_id = ?) AS avg_rating
                    FROM user_rating WHERE movie_id = ? AND user_id = ?
                    ORDER BY TIME DESC;
                `;
                const ratings = await Database.query(sql, [movieId, movieId, userId]);
                return ratings;
            } else if (movieId) {
                sql = "SELECT first_name, last_name, (SELECT value FROM user_rating WHERE user_id = id and movie_id = ?) FROM user WHERE id IN (SELECT user_id FROM user_rating WHERE movie_id = ?)";
                const ratings = await Database.query(sql, [movieId, movieId]);
                return ratings;
            } else if (userId) {
                sql =` 
                    SELECT *,
                    (SELECT title FROM movie WHERE id = movie_id) AS movie_title,
                    (SELECT ROUND(AVG(value), 1) FROM user_rating WHERE movie_id = movie_id) AS avg_rating
                    FROM user_rating WHERE user_id = ?
                    ORDER BY TIME DESC;
                `;
                const ratings = await Database.query(sql, [userId]);
                return ratings;
            }

            sql = "SELECT * FROM user_rating";
            const ratings = await Database.query(sql);
            return ratings;
        } catch (err) {
            console.log("Error getting ratings:", err);
            throw err;
        }
    };

    public addData = async (input: { [key: string]: any }) => {
        try {
            const movieId = input.movieId;
            const userId = input.userId;
            const rating = input.rating;

            await this.deleteData({ movieId: movieId, userId: userId });

            // console.log("res", res);

            const insertRatingSql = `
                INSERT INTO user_rating (movie_id, user_id, value)
                VALUES (?, ?, ?);
            `;
            await Database.query(insertRatingSql, [movieId, userId, rating]);
            return { message: "Add rating successfully" };
        } catch (err) {
            console.log("Error adding rating:", err);
            throw {
                message: "Error adding rating",
                error: err,
            };
        }
    };

    public updateData = async (input: { [key: string]: any }) => {
        try {
            const movieId = input.movieId;
            const userId = input.userId;
            const rating = input.rating;

            const updateRatingSql = `
                UPDATE user_rating
                SET value = ?
                WHERE movie_id = ? AND user_id = ?;
            `;

            await Database.query(updateRatingSql, [rating, movieId, userId]);

            return { message: "Update rating successfully" };
        } catch (err) {
            console.log("Error updating rating:", err);
            throw {
                message: "Error updating rating",
                error: err,
            };
        }
    };

    public deleteData = async (input: { [key: string]: any }) => {
        try {
            const movieId = input.movieId;
            const userId = input.userId;

            // console.log("movieId", movieId);
            // console.log("userId", userId);

            const deleteRatingSql = `
                DELETE FROM user_rating
                WHERE movie_id = ? AND user_id = ?;
            `;

            await Database.query(deleteRatingSql, [movieId, userId]);

            return { message: "Delete rating successfully" };
        } catch (err) {
            console.log("Error deleting rating:", err);
            throw {
                message: "Error deleting rating",
                error: err,
            };
        }
    };
}

export default new RatingManager();