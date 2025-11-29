import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Fab,
  IconButton,
  Badge,
  Typography,
  AppBar,
  Toolbar,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PostCard from "../components/PostCard.jsx";
import AddPostModal from "../components/AddPostModal.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const FeedPage = () => {
  const { mongoUser } = useAuth();
  const userId = mongoUser?._id;
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [circles, setCircles] = useState([]);
  const [activeCircle, setActiveCircle] = useState(null);
  const [role, setRole] = useState("");

  const isMobile = useMediaQuery("(max-width:600px)");

  // --- Fetch user circles ---
  const fetchUserCircles = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/crop-circle/get-my-circles?user_id=${userId}`
      );
      const userCircles = res.data.circles || [];
      setCircles(userCircles);

      if (userCircles.length > 0) {
        const firstCircle = userCircles[0];
        setActiveCircle(firstCircle);
        setRole(
          firstCircle.mentors.map(String).includes(String(userId))
            ? "Mentor"
            : "Learner"
        );
      }
    } catch (err) {
      console.error("Error fetching user circles:", err);
    }
  };

  const fetchPosts = async (circleId) => {
    if (!circleId) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/posts/circle/${circleId}`
      );
      const formattedPosts = res.data.posts.map((p) => ({
        ...p,
        media_url: p.media_url ? `http://localhost:5000${p.media_url}` : null,
      }));
      setPosts(formattedPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const fetchNotifications = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/notifications/${userId}`
      );
      const sorted = res.data.notifications.sort((a, b) => {
        if (
          a.type === "MENTOR_QUESTION" &&
          a.isActive &&
          !(b.type === "MENTOR_QUESTION" && b.isActive)
        )
          return -1;
        if (
          !(a.type === "MENTOR_QUESTION" && a.isActive) &&
          b.type === "MENTOR_QUESTION" &&
          b.isActive
        )
          return 1;
        if (!a.isRead && b.isRead) return -1;
        if (a.isRead && !b.isRead) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setNotifications(sorted);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    fetchUserCircles();
  }, [userId]);

  useEffect(() => {
    if (activeCircle) fetchPosts(activeCircle._id);
  }, [activeCircle]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <Box sx={{ width: "100%", maxWidth: 1000, mx: "auto", px: 2, pt: 0 }}>
      {/* Top App Bar */}
      <AppBar position="sticky" sx={{ bgcolor: "primary.main" }} elevation={3}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 1 : 0,
            py: isMobile ? 1 : 0,
          }}
        >
          {/* Circle selector */}
          {circles.length > 0 ? (
            <Select
              value={activeCircle?._id || ""}
              onChange={(e) => {
                const selected = circles.find((c) => c._id === e.target.value);
                setActiveCircle(selected);
                setRole(
                  selected.mentors.map(String).includes(String(userId))
                    ? "Mentor"
                    : "Learner"
                );
              }}
              sx={{
                minWidth: isMobile ? "100%" : 200,
                color: "white",
                fontWeight: 600,
                "& .MuiSvgIcon-root": { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                bgcolor: "rgba(255,255,255,0.1)",
                borderRadius: 1,
                px: 1,
              }}
            >
              {circles.map((circle) => (
                <MenuItem key={circle._id} value={circle._id}>
                  {circle.name || `${circle.crop_name} - ${circle.district}`}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              CropCircle Feed
            </Typography>
          )}

          <IconButton
            onClick={() => navigate("/cropcircle/notifications")}
            color="inherit"
            sx={{ mt: isMobile ? 1 : 0 }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Posts */}
      {activeCircle ? (
        posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post._id}
              id={post._id}
              username={post.user_id?.name}
              avatarSrc={
                post.user_id?.profile_photo
                  ? `http://localhost:5000${post.user_id.profile_photo}`
                  : ""
              }
              content={post.content}
              image={post.media_url}
              likes={post.likes}
              comments={post.comments}
              type={post.type}
              pinned={post.pinned}
              user_id={post.user_id?._id}
              updatePostComments={() => {}}
              deletePostFromState={() => {}}
            />
          ))
        ) : (
          <Typography sx={{ mt: 2 }}>No posts in this circle yet.</Typography>
        )
      ) : (
        <Typography sx={{ mt: 2 }}>
          You are not part of any circle. Join a circle to see posts.
        </Typography>
      )}

      {/* Floating "+" button */}
      {activeCircle && (
        <Fab
          color="primary"
          sx={{ position: "fixed", bottom: 80, right: 20, zIndex: 999 }}
          onClick={() => setOpenModal(true)}
        >
          <AddIcon />
        </Fab>
      )}

      {/* AddPostModal */}
      {openModal && activeCircle && (
        <AddPostModal
          userId={userId}
          circleId={activeCircle._id}
          onPostCreated={() => {}}
        />
      )}
    </Box>
  );
};

export default FeedPage;
