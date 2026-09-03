import React from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import { alpha, lighten, useTheme } from '@mui/material/styles';

const radiusMd = 12;
const radiusLg = 20;

const hoverCapable = '@media (hover: hover) and (pointer: fine)';

/* ------------------------------------------------------------------ */
/* Contact details                                                     */
/* ------------------------------------------------------------------ */

const contact = {
  name: 'Vijay Balaji B',
  role: 'Full-Stack Developer',
  email: 'balajibaskaran456@gmail.com',
  phone: '+91 63818 43894',
  location: 'Dindigul, Tamil Nadu',
};

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/vijay-balaji05',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/vijay-balaji-b-4198a6325',
  },
];

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

interface IconProps {
  size?: number;
}

const MailIcon: React.FC<IconProps> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon: React.FC<IconProps> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.712 1.528l-.465.355a1 1 0 0 0-.302 1.212 12.35 12.35 0 0 0 6.31 6.473Z" />
  </svg>
);

const PinIcon: React.FC<IconProps> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const LinkIcon: React.FC<IconProps> = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const Footer: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';


  const visibleSocials = socials.filter(
    (social) => social.href
  );

  const telHref = `tel:${contact.phone.replace(/[^\d+]/g, '')}`;

  /*
   * MUI automatically changes these values when palette.mode changes.
   * `accent` reads theme.palette.primary.main, which ThemeProvider sets
   * per-mode — bright neon cyan for dark, a deeper teal-cyan for light —
   * so this section stops being hardcoded to one look.
   */
  const background = theme.palette.background.default;
  const surface = theme.palette.background.paper;
  const textPrimary = theme.palette.text.primary;
  const textSecondary = theme.palette.text.secondary;

  const accent = theme.palette.primary.main;
  const accentHover = lighten(accent, isDark ? 0.25 : 0.15);
  const accentSoft = alpha(accent, isDark ? 0.08 : 0.1);
  const accentBorder = alpha(accent, isDark ? 0.24 : 0.32);
  // Text color that sits on top of a solid `accent` fill — dark text on
  // the bright dark-mode cyan, light text on the deeper light-mode teal.
  const accentContrastText = theme.palette.getContrastText(accent);

  const border =
    isDark
      ? 'rgba(148, 163, 184, 0.12)'
      : 'rgba(15, 23, 42, 0.12)';

  const buttonBackground =
    isDark
      ? 'rgba(255, 255, 255, 0.04)'
      : 'rgba(15, 23, 42, 0.04)';


  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: background,
        color: textPrimary,
        borderTop: `1px solid ${border}`,
        py: {
          xs: 6,
          sm: 7,
          md: 9,
        },
        transition:
          'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: {
            xs: 2.5,
            sm: 3,
            md: 4,
          },
        }}
      >
        {/* ==========================================================
            CTA PANEL
        =========================================================== */}

        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },

            alignItems: {
              xs: 'stretch',
              md: 'center',
            },

            justifyContent: 'space-between',

            gap: {
              xs: 3,
              md: 4,
            },

            p: {
              xs: 3,
              sm: 4,
              md: 5,
            },

            mb: {
              xs: 5,
              sm: 6,
              md: 7,
            },

            borderRadius: `${radiusLg}px`,

            border: `1px solid ${accentBorder}`,

            backgroundColor: surface,

            backgroundImage: `
              radial-gradient(
                120% 140% at 0% 0%,
                ${accentSoft} 0%,
                transparent 55%
              )
            `,

            textAlign: {
              xs: 'center',
              md: 'left',
            },

            transition:
              'background-color 0.3s ease',
          }}
        >
          <Box>
            <Typography
              component="h2"
              sx={{
                fontWeight: 800,

                fontSize:
                  'clamp(1.4rem, 1.15rem + 1vw, 1.9rem)',

                color: textPrimary,

                mb: 1,
              }}
            >
              Let's work together
            </Typography>

            <Typography
              sx={{
                color: textSecondary,

                fontSize: {
                  xs: '0.9rem',
                  sm: '0.95rem',
                },

                maxWidth: 440,

                mx: {
                  xs: 'auto',
                  md: 0,
                },

                lineHeight: 1.7,
              }}
            >
              Open to new opportunities and interesting
              projects — reach out any time.
            </Typography>
          </Box>

          {/* CTA Buttons */}

          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={1.5}
            sx={{
              width: {
                xs: '100%',
                md: 'auto',
              },

              flexShrink: 0,
            }}
          >
            {/* Email */}

            <Button
              component="a"
              href={`mailto:${contact.email}`}
              variant="contained"
              disableElevation
              startIcon={<MailIcon size={16} />}
              sx={{
                borderRadius: `${radiusMd}px`,

                px: 3,
                py: 1.2,

                textTransform: 'none',

                fontWeight: 700,

                fontSize: '0.9rem',

                backgroundColor: accent,

                color: accentContrastText,

                [hoverCapable]: {
                  '&:hover': {
                    backgroundColor: accentHover,
                  },
                },
              }}
            >
              Email me
            </Button>

            {/* Phone */}

            <Button
              component="a"
              href={telHref}
              variant="outlined"
              startIcon={<PhoneIcon size={16} />}
              sx={{
                borderRadius: `${radiusMd}px`,

                px: 3,
                py: 1.2,

                textTransform: 'none',

                fontWeight: 700,

                fontSize: '0.9rem',

                color: textPrimary,

                borderColor: border,

                backgroundColor: buttonBackground,

                [hoverCapable]: {
                  '&:hover': {
                    borderColor: accent,

                    backgroundColor: accentSoft,

                    color: accent,
                  },
                },
              }}
            >
              Call me
            </Button>
          </Stack>
        </Box>

        {/* ==========================================================
            IDENTITY + DETAILS
        =========================================================== */}

        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              sm: '1.3fr 1fr',
            },

            gap: {
              xs: 4,
              sm: 4,
            },

            pb: {
              xs: 4,
              sm: 5,
            },

            textAlign: {
              xs: 'center',
              sm: 'left',
            },
          }}
        >
          {/* Identity */}

          <Box>
            <Typography
              sx={{
                fontWeight: 800,

                fontSize:
                  'clamp(1.15rem, 1.05rem + 0.4vw, 1.3rem)',

                color: textPrimary,

                mb: 0.5,
              }}
            >
              {contact.name}
            </Typography>

            <Typography
              sx={{
                color: accent,

                fontSize: '0.875rem',

                fontWeight: 600,

                mb: 1.5,
              }}
            >
              {contact.role}
            </Typography>

            {contact.location && (
              <Box
                sx={{
                  display: 'inline-flex',

                  alignItems: 'center',

                  gap: 0.75,

                  color: textSecondary,

                  fontSize: '0.85rem',
                }}
              >
                <PinIcon size={15} />

                {contact.location}
              </Box>
            )}
          </Box>

          {/* Social + Email */}

          <Box
            sx={{
              display: 'flex',

              flexDirection: 'column',

              alignItems: {
                xs: 'center',
                sm: 'flex-end',
              },

              gap: 1.5,
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                flexWrap: 'wrap',

                justifyContent: {
                  xs: 'center',
                  sm: 'flex-end',
                },
              }}
            >
              {visibleSocials.map((social) => (
                <Box
                  key={social.label}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex',

                    alignItems: 'center',

                    gap: 0.75,

                    px: 1.75,
                    py: 0.85,

                    borderRadius: '999px',

                    border: `1px solid ${border}`,

                    backgroundColor:
                      buttonBackground,

                    color: textSecondary,

                    textDecoration: 'none',

                    fontSize: '0.8rem',

                    fontWeight: 600,

                    transition:
                      'all 0.25s ease',

                    [hoverCapable]: {
                      '&:hover': {
                        color: accent,

                        borderColor: accentBorder,

                        backgroundColor: accentSoft,
                      },
                    },
                  }}
                >
                  <LinkIcon size={13} />

                  {social.label}
                </Box>
              ))}
            </Stack>

            <Box
              component="a"
              href={`mailto:${contact.email}`}
              sx={{
                color: textSecondary,

                fontSize: '0.85rem',

                textDecoration: 'none',

                transition: 'color 0.2s ease',

                [hoverCapable]: {
                  '&:hover': {
                    color: accent,
                  },
                },
              }}
            >
              {contact.email}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;