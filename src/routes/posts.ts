import express from "express";
import { getAllPosts, getPostById, createPost, updatePost, deletePost, getComments } from "../controllers/postController";
import getPost from "../middleware/getPostMiddleware";

const router = express.Router();

// Pobierz wszystkie posty
router.get("/", getAllPosts);

// Pobierz jeden post
router.get("/:id", getPost, getPostById);

// Utwórz nowy post
router.post("/", createPost);

// Zaktualizuj post
router.patch("/:id", getPost, updatePost);

// Usuń post
router.delete("/:id", getPost, deletePost);

// Pobierz komentarze
router.get("/comments/:id", getPost, getComments);

module.exports = router;