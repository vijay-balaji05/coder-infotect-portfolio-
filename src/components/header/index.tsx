import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Slide,
  useScrollTrigger,
  Container,
  Drawer,
  Divider,
  Modal,
  Fade,
  Tooltip,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import { useNavigate } from 'react-router-dom';
import { alpha, lighten, useTheme } from '@mui/material/styles';

import ProfilePhoto from '../../assets/profile.jpeg';
import { useThemeMode } from '../../providers/theme-provider';

interface HideOnScrollProps {
  children: React.ReactElement;
}

const AVATAR_SRC = ProfilePhoto;
const CONTACT_EMAIL = 'your.email@example.com';

const HideOnScroll: React.FC<HideOnScrollProps> = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const navigate = useNavigate();

  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleAvatarClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAvatarOpen(true);
  };

  const handleAvatarKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      setAvatarOpen(true);
    }
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const isDark = mode === 'dark';

  /*
   * Theme-aware colors.
   * `accent`/`accentAlt` come from the palette (set per-mode in
   * ThemeProvider) instead of a hardcoded cyan, so light mode gets the
   * deeper, better-contrast brand color automatically.
   */
  const accent = theme.palette.primary.main;
  const accentAlt = theme.palette.secondary.main;
  const accentTertiary = lighten(accentAlt, isDark ? 0.15 : 0.1);

  const headerBackground = isDark
    ? 'rgba(5, 7, 20, 0.92)'
    : 'rgba(255, 255, 255, 0.92)';

  const borderColor = isDark
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.08)';

  const buttonBackground = isDark
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(0, 0, 0, 0.04)';

  const primaryText = theme.palette.text.primary;
  const secondaryText = theme.palette.text.secondary;

  return (
    <>
      <style>
        {`
          @keyframes headerGlowPulse {
            0%, 100% {
              opacity: 0.55;
              transform: scale(1);
            }

            50% {
              opacity: 1;
              transform: scale(1.06);
            }
          }

          @keyframes headerAccentFlow {
            to {
              background-position: -200% 0;
            }
          }
        `}
      </style>

      <HideOnScroll>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            backgroundColor: headerBackground,
            backdropFilter: 'blur(16px)',

            borderBottom: '1px solid',
            borderColor: scrolled
              ? alpha(accent, 0.2)
              : borderColor,

            boxShadow: scrolled
              ? `0 10px 30px -10px ${alpha(accent, 0.15)}`
              : 'none',

            transition:
              'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',

            '&::after': {
              content: '""',
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: -1,
              height: '1px',

              background: `linear-gradient(90deg, transparent, ${accent}, ${accentAlt}, transparent, ${accent})`,

              backgroundSize: '200% 100%',

              opacity: scrolled ? 0.7 : 0,

              transition: 'opacity 0.35s ease',

              animation:
                'headerAccentFlow 6s linear infinite',

              pointerEvents: 'none',
            },
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{
                position: 'relative',
                height: { xs: 64, md: 72 },
                px: { xs: 1, md: 2 },
              }}
            >

              {/* =========================
                  CENTER BRAND
              ========================== */}

              <Box
                component="a"
                href="#home"
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',

                  display: 'flex',
                  alignItems: 'center',

                  gap: {
                    xs: 1,
                    sm: 1.5,
                  },

                  maxWidth: {
                    xs: 175,
                    sm: 260,
                    md: 'none',
                  },

                  textDecoration: 'none',
                  cursor: 'pointer',

                  '&:hover .avatar-glow': {
                    opacity: 1,
                    filter: 'blur(14px)',
                  },
                }}
              >
                {/* Avatar */}

                <Box
                  role="button"
                  tabIndex={0}
                  aria-label="View profile photo"
                  onClick={handleAvatarClick}
                  onKeyDown={handleAvatarKeyDown}
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'zoom-in',
                    borderRadius: '50%',

                    '&:hover .profile-avatar, &:focus-visible .profile-avatar':
                      {
                        transform: 'scale(1.08) rotate(4deg)',
                        borderColor: accentAlt,
                      },

                    '&:focus-visible': {
                      outline: `2px solid ${accent}`,
                      outlineOffset: 3,
                    },
                  }}
                >
                  <Box
                    className="avatar-glow"
                    sx={{
                      position: 'absolute',
                      inset: -3,
                      borderRadius: '50%',

                      background: `linear-gradient(135deg, ${accent} 0%, ${accentAlt} 50%, ${accentTertiary} 100%)`,

                      opacity: 0,

                      transition:
                        'opacity 0.35s ease-in-out, filter 0.35s ease-in-out',
                    }}
                  />

                  <Avatar
                    className="profile-avatar"
                    alt="Profile Logo"
                    src={AVATAR_SRC}
                    sx={{
                      width: {
                        xs: 38,
                        md: 44,
                      },

                      height: {
                        xs: 38,
                        md: 44,
                      },

                      border: `2px solid ${accent}`,

                      transition:
                        'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  />
                </Box>

                {/* Brand */}

                <Typography
                  variant="h6"
                  component="span"
                  sx={{
                    fontWeight: 700,

                    color: primaryText,

                    fontSize: {
                      xs: '0.95rem',
                      sm: '1.05rem',
                      md: '1.2rem',
                    },

                    letterSpacing: '0.5px',

                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',

                    '& span': {
                      color: accent,
                      transition: 'color 0.3s ease',
                    },

                    '&:hover span': {
                      color: accentAlt,
                    },
                  }}
                >
                  Vijay <span>Balaji</span>
                </Typography>
              </Box>

              {/* =========================
                  DESKTOP LEFT NAV
              ========================== */}

              <Box
                sx={{
                  position: 'absolute',
                  left: 0,

                  display: {
                    xs: 'none',
                    md: 'flex',
                  },

                  alignItems: 'center',
                  gap: 1.25,
                }}
              >
                <Box
                  component="a"
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/projects');
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,

                    color: primaryText,

                    textDecoration: 'none',

                    backgroundColor: buttonBackground,

                    border: `1px solid ${alpha(accent, 0.2)}`,

                    borderRadius: '10px',

                    px: 1.5,
                    py: 1,

                    fontSize: '0.9rem',
                    fontWeight: 600,

                    transition:
                      'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

                    '&:hover': {
                      color: accent,

                      backgroundColor: alpha(accent, 0.12),

                      borderColor: accent,

                      transform: 'translateY(-2px)',

                      boxShadow: `0 4px 15px ${alpha(accent, 0.25)}`,
                    },
                  }}
                >
                  <FolderOpenIcon sx={{ fontSize: 18 }} />
                  Projects
                </Box>
              </Box>

              {/* =========================
                  DESKTOP RIGHT ACTIONS
              ========================== */}

              <Box
                sx={{
                  position: 'absolute',
                  right: 0,

                  display: {
                    xs: 'none',
                    md: 'flex',
                  },

                  alignItems: 'center',
                  gap: 1.25,
                }}
              >
                {/* Email */}

                <Tooltip title="Send Email">
                  <IconButton
                    component="a"
                    href={`mailto:${CONTACT_EMAIL}`}
                    aria-label="Contact via email"
                    sx={{
                      color: primaryText,

                      backgroundColor: buttonBackground,

                      border: `1px solid ${alpha(accent, 0.2)}`,

                      borderRadius: '10px',

                      p: 1.1,

                      transition:
                        'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

                      '&:hover': {
                        color: accent,

                        backgroundColor: alpha(accent, 0.12),

                        borderColor: accent,

                        transform: 'translateY(-2px)',

                        boxShadow: `0 4px 15px ${alpha(accent, 0.25)}`,
                      },
                    }}
                  >
                    <EmailIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Tooltip>

                {/* Theme */}

                <Tooltip
                  title={
                    isDark
                      ? 'Switch to Light Mode'
                      : 'Switch to Dark Mode'
                  }
                >
                  <IconButton
                    onClick={handleThemeToggle}
                    aria-label="Toggle theme"
                    sx={{
                      color: primaryText,

                      backgroundColor: buttonBackground,

                      border: `1px solid ${alpha(accent, 0.2)}`,

                      borderRadius: '10px',

                      p: 1.1,

                      transition:
                        'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

                      '&:hover': {
                        color: accent,

                        backgroundColor: alpha(accent, 0.12),

                        borderColor: accent,

                        transform: 'translateY(-2px)',

                        boxShadow: `0 4px 15px ${alpha(accent, 0.25)}`,
                      },
                    }}
                  >
                    {isDark ? (
                      <LightModeIcon sx={{ fontSize: 20 }} />
                    ) : (
                      <DarkModeIcon sx={{ fontSize: 20 }} />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>

              {/* =========================
                  MOBILE CONTROLS
              ========================== */}

              <Box
                sx={{
                  position: 'absolute',
                  right: 0,

                  display: {
                    xs: 'flex',
                    md: 'none',
                  },

                  alignItems: 'center',
                  gap: 1,
                }}
              >
                {/* Mobile Theme */}

                <Tooltip
                  title={
                    isDark
                      ? 'Switch to Light Mode'
                      : 'Switch to Dark Mode'
                  }
                >
                  <IconButton
                    onClick={handleThemeToggle}
                    aria-label="Toggle theme"
                    sx={{
                      color: primaryText,

                      backgroundColor: buttonBackground,

                      border: `1px solid ${alpha(accent, 0.2)}`,

                      borderRadius: '10px',

                      p: 1,

                      '&:hover': {
                        color: accent,

                        backgroundColor: alpha(accent, 0.1),
                      },
                    }}
                  >
                    {isDark ? (
                      <LightModeIcon sx={{ fontSize: 18 }} />
                    ) : (
                      <DarkModeIcon sx={{ fontSize: 18 }} />
                    )}
                  </IconButton>
                </Tooltip>

                {/* Mobile Menu */}

                <IconButton
                  aria-label="open menu"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{
                    color: primaryText,

                    backgroundColor: buttonBackground,

                    border: `1px solid ${alpha(accent, 0.2)}`,

                    borderRadius: '10px',

                    p: 1,

                    '&:hover': {
                      backgroundColor: alpha(accent, 0.1),

                      color: accent,
                    },
                  }}
                >
                  <MenuIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* =========================
          PROFILE PHOTO MODAL
      ========================== */}

      <Modal
        open={avatarOpen}
        onClose={() => setAvatarOpen(false)}
        closeAfterTransition
        aria-labelledby="profile-photo-title"
      >
        <Fade in={avatarOpen}>
          <Box
            sx={{
              position: 'fixed',
              inset: 0,

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              backgroundColor: isDark
                ? 'rgba(2, 3, 10, 0.85)'
                : 'rgba(255, 255, 255, 0.85)',

              backdropFilter: 'blur(8px)',

              p: 3,
            }}
            onClick={() => setAvatarOpen(false)}
          >
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2.5,
              }}
            >
              <IconButton
                onClick={() => setAvatarOpen(false)}
                aria-label="Close profile photo"
                sx={{
                  alignSelf: 'flex-end',

                  color: secondaryText,

                  backgroundColor: buttonBackground,

                  border: `1px solid ${alpha(accent, 0.2)}`,

                  '&:hover': {
                    color: accent,

                    backgroundColor: alpha(accent, 0.1),
                  },
                }}
              >
                <CloseIcon />
              </IconButton>

              <Box
                sx={{
                  position: 'relative',

                  width: {
                    xs: 240,
                    sm: 280,
                    md: 320,
                  },

                  height: {
                    xs: 240,
                    sm: 280,
                    md: 320,
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: -12,

                    borderRadius: '50%',

                    background: `linear-gradient(135deg, ${accent} 0%, ${accentAlt} 50%, ${accentTertiary} 100%)`,

                    filter: 'blur(24px)',

                    animation:
                      'headerGlowPulse 2.6s ease-in-out infinite',
                  }}
                />

                <Avatar
                  src={AVATAR_SRC}
                  alt="Profile photo"
                  sx={{
                    position: 'relative',

                    width: '100%',
                    height: '100%',

                    border: `3px solid ${accent}`,

                    boxShadow: `0 0 40px ${alpha(accent, 0.35)}`,
                  }}
                />
              </Box>

              <Typography
                id="profile-photo-title"
                sx={{
                  color: primaryText,
                  fontWeight: 700,
                  fontSize: '1.25rem',
                }}
              >
                Vijay{' '}
                <span style={{ color: accent }}>
                  Balaji
                </span>
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* =========================
          MOBILE DRAWER
      ========================== */}

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        slotProps={{
          paper: {
            sx: {
              width: '75%',
              maxWidth: 280,

              backgroundColor:
                theme.palette.background.paper,

              backgroundImage: 'none',

              borderLeft: `1px solid ${alpha(accent, 0.2)}`,

              p: 2.5,
            },
          },
        }}
      >
        {/* Drawer Header */}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: primaryText,
              fontWeight: 700,
            }}
          >
            Menu
          </Typography>

          <IconButton
            onClick={handleDrawerToggle}
            aria-label="Close menu"
            sx={{
              color: secondaryText,

              '&:hover': {
                color: accent,
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider
          sx={{
            borderColor: isDark
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.08)',

            mb: 1.5,
          }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {/* Projects */}

          <Box
            component="a"
            onClick={() => {
              handleDrawerToggle();
              navigate('/projects');
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,

              color: primaryText,

              textDecoration: 'none',

              borderRadius: '12px',

              border: `1px solid ${alpha(accent, 0.15)}`,

              backgroundColor: buttonBackground,

              p: 1.5,

              fontWeight: 600,
              fontSize: '0.95rem',

              cursor: 'pointer',

              transition: 'all 0.25s ease',

              '&:hover': {
                color: accent,

                backgroundColor: alpha(accent, 0.08),

                borderColor: accent,
              },
            }}
          >
            <FolderOpenIcon sx={{ fontSize: 20 }} />

            Projects
          </Box>

          {/* Email */}

          <Box
            component="a"
            href={`mailto:${CONTACT_EMAIL}`}
            onClick={handleDrawerToggle}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,

              color: primaryText,

              textDecoration: 'none',

              borderRadius: '12px',

              border: `1px solid ${alpha(accent, 0.15)}`,

              backgroundColor: buttonBackground,

              p: 1.5,

              fontWeight: 600,
              fontSize: '0.95rem',

              transition: 'all 0.25s ease',

              '&:hover': {
                color: accent,

                backgroundColor: alpha(accent, 0.08),

                borderColor: accent,
              },
            }}
          >
            <EmailIcon sx={{ fontSize: 20 }} />

            Send Email
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;