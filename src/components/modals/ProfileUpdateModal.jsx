import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const ProfileUpdateModal = ({ user, updateProfile, open, onClose }) => {
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [userName, setUserName] = useState(user?.userName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSave = async () => {
    try {
      await updateProfile({ fullname, userName, email, currentPassword, newPassword });
      onClose();
    } catch (error) {
      console.error("Güncelleme hatası:", error.message);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Profilini Güncelle
        </Typography>
        <TextField
          label="Ad Soyad"
          variant="outlined"
          fullWidth
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Kullanıcı Adı"
          variant="outlined"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Eski Şifre"
          type="password"
          variant="outlined"
          fullWidth
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Yeni Şifre"
          type="password"
          variant="outlined"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" onClick={handleSave}>
            Kaydet
          </Button>
          <Button variant="outlined" onClick={onClose}>
            İptal
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProfileUpdateModal;
