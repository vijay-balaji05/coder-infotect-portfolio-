import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Stack,
  Dialog,
  DialogContent,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import furnizeImg1 from '../../assets/projects/furnize-mobile-img-1.jpeg';
import furnizeImg2 from '../../assets/projects/furnize-mobile-img-2.jpeg';
import furnizeImg3 from '../../assets/projects/furnize-mobile-img-3.jpeg';
import furnizeImg4 from '../../assets/projects/furnize-mobile-img-4.jpeg';
import furnizeImg5 from '../../assets/projects/furnize-mobile-img-5.jpeg';
import furnizeImg6 from '../../assets/projects/furnize-mobile-img-6.jpeg';

/* ------------------------------------------------------------------ */
/*  Theme-derived design tokens.                                       */
/*  Radii/brand accent stay fixed; every background/text/border color  */
/*  is computed from `theme`, so this section reacts to dark/light     */
/*  toggles instead of being frozen to one look.                       */
/* ------------------------------------------------------------------ */
const useProjectTokens = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const accent = theme.palette.primary.main;

  return {
    isDark,
    bg: theme.palette.background.default,
    surface: alpha(theme.palette.background.paper, isDark ? 0.6 : 0.9),
    surfaceHover: alpha(theme.palette.background.paper, isDark ? 0.8 : 1),
    border: alpha(theme.palette.text.primary, isDark ? 0.12 : 0.12),
    borderHover: alpha(accent, isDark ? 0.45 : 0.55),
    accent,
    accentSoft: alpha(accent, isDark ? 0.08 : 0.1),
    accentBorder: alpha(accent, isDark ? 0.24 : 0.32),
    textPrimary: theme.palette.text.primary,
    textSecondary: theme.palette.text.secondary,
    neutralOverlay: (o: number) => alpha(theme.palette.text.primary, o),
    radiusLg: 20,
    radiusMd: 12,
  };
};

const reduceMotion = '@media (prefers-reduced-motion: reduce)';
const hoverCapable = '@media (hover: hover) and (pointer: fine)';

interface IconProps {
  size?: number;
}

const Calendar: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const CloseIconSvg: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const ImagesIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);

const ChevronLeft: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

interface Project {
  id: number;
  title: string;
  description: string;
  duration: string;
  url: string;
  tags: string[];
  images: string[];
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Online Furniture Booking Mobile App',
    description:
      'A cross-platform booking experience that lets customers browse a furniture catalog, reserve items for delivery or in-store pickup, and track orders in real time. Built the full stack — mobile client, REST API, and database — from the ground up.',
    duration: 'Jan 2024 - Mar 2024',
    url: 'https://example.com/project-one',
    tags: ['React Native', 'TypeScript', 'Spring Boot', 'MySQL', 'REST API'],
    images: [furnizeImg1, furnizeImg2, furnizeImg3, furnizeImg4, furnizeImg5, furnizeImg6],
  },
];

/* ------------------------------------------------------------------ */
/*  Gallery                                                           */
/* ------------------------------------------------------------------ */

interface GalleryDialogProps {
  open: boolean;
  onClose: () => void;
  images: string[];
  title: string;
  initialIndex?: number;
}

// Full gallery: opens on click, single image at a time with prev/next —
// avoids forcing a long vertical scroll through every screenshot.
const GalleryDialog: React.FC<GalleryDialogProps> = ({ open, onClose, images, title, initialIndex = 0 }) => {
  const theme = useTheme();
  const t = useProjectTokens();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [index, setIndex] = useState(initialIndex);

  const hasMultiple = images.length > 1;

  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setIndex((i) => (i + 1) % images.length);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!hasMultiple) return;
    if (event.key === 'ArrowLeft') goPrev();
    if (event.key === 'ArrowRight') goNext();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      aria-labelledby="gallery-dialog-title"
      slotProps={{
        paper: {
          sx: {
            backgroundColor: t.bg,
            backgroundImage: 'none',
            border: fullScreen ? 'none' : `1px solid ${t.accentBorder}`,
            borderRadius: fullScreen ? 0 : `${t.radiusLg}px`,
            m: fullScreen ? 0 : 2,
          },
        },
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          px: { xs: 2, sm: 3 },
          py: 1.75,
          backgroundColor: alpha(t.bg, 0.92),
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${t.border}`,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            id="gallery-dialog-title"
            noWrap
            sx={{ color: t.textPrimary, fontWeight: 700, fontSize: { xs: '0.9rem', sm: '1.05rem' } }}
          >
            {title}
          </Typography>
          {hasMultiple && (
            <Typography sx={{ color: t.textSecondary, fontSize: '0.78rem', mt: 0.25 }}>
              {index + 1} of {images.length}
            </Typography>
          )}
        </Box>
        <IconButton
          onClick={onClose}
          aria-label="Close gallery"
          sx={{
            flexShrink: 0,
            width: 40,
            height: 40,
            color: t.textSecondary,
            backgroundColor: t.neutralOverlay(t.isDark ? 0.05 : 0.04),
            border: `1px solid ${t.accentBorder}`,
            [hoverCapable]: {
              '&:hover': { color: t.accent, backgroundColor: t.accentSoft },
            },
          }}
        >
          <CloseIconSvg size={18} />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          p: { xs: 1.5, sm: 3 },
          backgroundColor: t.bg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="img"
            key={index}
            src={images[index]}
            alt={`${title} — screen ${index + 1} of ${images.length}`}
            loading="eager"
            sx={{
              width: '100%',
              maxHeight: { xs: '70vh', sm: '75vh' },
              objectFit: 'contain',
              display: 'block',
              borderRadius: `${t.radiusMd}px`,
              border: `1px solid ${t.border}`,
            }}
          />

          {hasMultiple && (
            <>
              <IconButton
                onClick={goPrev}
                aria-label="Previous screenshot"
                sx={{
                  position: 'absolute',
                  left: { xs: 4, sm: -8 },
                  color: t.textPrimary,
                  backgroundColor: alpha(t.bg, 0.6),
                  border: `1px solid ${t.border}`,
                  width: 40,
                  height: 40,
                  [hoverCapable]: {
                    '&:hover': { backgroundColor: alpha(t.bg, 0.85), borderColor: t.borderHover },
                  },
                }}
              >
                <ChevronLeft size={20} />
              </IconButton>
              <IconButton
                onClick={goNext}
                aria-label="Next screenshot"
                sx={{
                  position: 'absolute',
                  right: { xs: 4, sm: -8 },
                  color: t.textPrimary,
                  backgroundColor: alpha(t.bg, 0.6),
                  border: `1px solid ${t.border}`,
                  width: 40,
                  height: 40,
                  [hoverCapable]: {
                    '&:hover': { backgroundColor: alpha(t.bg, 0.85), borderColor: t.borderHover },
                  },
                }}
              >
                <ChevronRight size={20} />
              </IconButton>
            </>
          )}
        </Box>

        {hasMultiple && (
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            {images.map((thumb, i) => (
              <Box
                key={i}
                component="button"
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                aria-current={i === index}
                sx={{
                  width: 44,
                  height: 44,
                  p: 0,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: i === index ? `2px solid ${t.accent}` : `1px solid ${t.border}`,
                  opacity: i === index ? 1 : 0.55,
                  transition: 'opacity 0.2s ease',
                  '&:focus-visible': { outline: `2px solid ${t.accent}`, outlineOffset: 2 },
                }}
              >
                <Box
                  component="img"
                  src={thumb}
                  alt=""
                  loading="lazy"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </Box>
            ))}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

/* ------------------------------------------------------------------ */
/*  Thumbnail                                                          */
/* ------------------------------------------------------------------ */

interface ProjectThumbnailProps {
  image: string;
  count: number;
  title: string;
  onOpen: () => void;
}

// Mobile: full-bleed cropped hero image (works fine — the card itself is
// already narrow and roughly matches the screenshot's proportions).
// Desktop/laptop: these are *portrait* phone screenshots. Stretching one
// across a wide 50%-width panel and cropping it with object-fit: cover was
// the "totally bad" desktop problem — most of the screenshot got cut off
// and the crop changed depending on how tall the text column happened to
// be. Fix: on md+ the image sits inside a fixed-size phone-shaped frame
// (correct portrait aspect ratio, bezel, shadow) on a quiet backdrop, so
// the full screenshot is always visible and the panel reads as a
// deliberate product shot instead of an accidental crop.
const ProjectThumbnail: React.FC<ProjectThumbnailProps> = ({ image, count, title, onOpen }) => {
  const t = useProjectTokens();

  return (
    <Box
      component="button"
      type="button"
      onClick={onOpen}
      aria-label={`View all ${count} screenshots of ${title}`}
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        minHeight: { xs: 260, sm: 340, md: 440, lg: 480 },
        p: { xs: 0, md: 4, lg: 5 },
        border: 'none',
        cursor: 'pointer',
        overflow: 'hidden',
        backgroundColor: t.neutralOverlay(t.isDark ? 0.03 : 0.02),
        backgroundImage: {
          md: `radial-gradient(60% 55% at 50% 42%, ${t.accentSoft} 0%, ${alpha(t.bg, 0)} 72%)`,
        },
        '&:focus-visible': {
          outline: `2px solid ${t.accent}`,
          outlineOffset: -2,
        },
        [hoverCapable]: {
          '&:hover .thumb-img': { transform: 'scale(1.045)' },
          '&:hover .thumb-overlay': { opacity: 1 },
          '&:hover .thumb-frame': { transform: { md: 'translateY(-6px)' } },
        },
      }}
    >
      {/* Frame: plain full-bleed box on mobile, phone-shaped card on desktop */}
      <Box
        className="thumb-frame"
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          maxWidth: { xs: 'none', md: 240, lg: 268 },
          aspectRatio: { xs: '4 / 3', md: '9 / 18.5' },
          borderRadius: { xs: 0, md: '28px' },
          overflow: 'hidden',
          border: { xs: 'none', md: `1px solid ${t.neutralOverlay(0.08)}` },
          boxShadow: {
            xs: 'none',
            md: `0 30px 60px -22px ${alpha(t.accent, 0.25)}, 0 14px 28px -14px ${alpha('#000000', 0.6)}`,
          },
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          [reduceMotion]: { transition: 'none' },
        }}
      >
        <Box
          className="thumb-img"
          component="img"
          src={image}
          alt={`${title} preview`}
          loading="lazy"
          decoding="async"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'block',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            [reduceMotion]: { transition: 'none' },
          }}
        />

        <Box
          className="thumb-overlay"
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            p: { xs: 1.5, sm: 2, md: 1.75 },
            background: `linear-gradient(180deg, ${alpha(t.bg, 0)} 55%, ${alpha(t.bg, 0.85)} 100%)`,
            opacity: { xs: 1, md: 0 },
            transition: 'opacity 0.3s ease',
            [reduceMotion]: { transition: 'none' },
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1.5,
              py: 0.75,
              borderRadius: '999px',
              backgroundColor: alpha(t.bg, 0.7),
              border: `1px solid ${t.accentBorder}`,
              color: t.textPrimary,
            }}
          >
            <ImagesIcon size={15} />
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 600 }}>
              {count} {count === 1 ? 'screenshot' : 'screenshots'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

/* ------------------------------------------------------------------ */
/*  Spotlight                                                          */
/* ------------------------------------------------------------------ */

interface ProjectSpotlightProps {
  project: Project;
  reversed: boolean;
  index: number;
  total: number;
}

const ProjectSpotlight: React.FC<ProjectSpotlightProps> = ({ project, reversed, index, total }) => {
  const t = useProjectTokens();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openGallery = (startAt = 0) => {
    setGalleryIndex(startAt);
    setGalleryOpen(true);
  };

  return (
    <Box
      component="article"
      aria-label={total > 1 ? `Project ${index + 1} of ${total}: ${project.title}` : undefined}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: reversed ? 'minmax(0, 1fr) minmax(300px, 380px)' : 'minmax(300px, 380px) minmax(0, 1fr)',
          },
          backgroundColor: t.surface,
          backdropFilter: 'blur(16px)',
          border: `1px solid ${t.border}`,
          borderRadius: { xs: '18px', sm: `${t.radiusLg}px` },
          overflow: 'hidden',
          transition: 'border-color 0.35s ease, box-shadow 0.35s ease, background-color 0.35s ease',
          [reduceMotion]: { transition: 'none' },
          [hoverCapable]: {
            '&:hover': {
              borderColor: t.borderHover,
              backgroundColor: t.surfaceHover,
              boxShadow: `0 20px 48px -24px ${alpha(t.accent, 0.28)}`,
            },
          },
        }}
      >
        <Box
          sx={{
            order: { xs: 1, md: reversed ? 2 : 1 },
          }}
        >
          <ProjectThumbnail
            image={project.images[0]}
            count={project.images.length}
            title={project.title}
            onOpen={() => openGallery(0)}
          />
        </Box>

        <Box
          sx={{
            order: { xs: 2, md: reversed ? 1 : 2 },
            p: { xs: 3, sm: 4, md: 5, lg: 6 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minWidth: 0,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: t.accent, mb: 1.5 }}>
            <Calendar size={16} />
            <Typography
              component="time"
              sx={{ fontWeight: 600, fontSize: { xs: '0.78rem', sm: '0.825rem' }, letterSpacing: '0.01em' }}
            >
              {project.duration}
            </Typography>
          </Box>

          <Typography
            variant="h5"
            component="h3"
            sx={{
              fontWeight: 700,
              color: t.textPrimary,
              mb: 1.5,
              fontSize: 'clamp(1.25rem, 1.05rem + 1vw, 1.65rem)',
              lineHeight: 1.3,
            }}
          >
            {project.title}
          </Typography>

          <Typography
            sx={{
              color: t.textSecondary,
              mb: 3,
              lineHeight: 1.75,
              fontSize: 'clamp(0.875rem, 0.82rem + 0.25vw, 0.975rem)',
              maxWidth: '58ch',
            }}
          >
            {project.description}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: { xs: 3, sm: 4 } }}>
            {project.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  backgroundColor: t.accentSoft,
                  color: t.accent,
                  border: `1px solid ${t.accentBorder}`,
                  fontWeight: 500,
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                  height: { xs: 26, sm: 28 },
                }}
              />
            ))}
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button
              type="button"
              onClick={() => openGallery(0)}
              variant="text"
              fullWidth={false}
              startIcon={<ImagesIcon size={16} />}
              sx={{
                borderRadius: `${t.radiusMd}px`,
                px: 2.5,
                py: 1.1,
                width: { xs: '100%', sm: 'auto' },
                textTransform: 'none',
                fontWeight: 600,
                fontSize: { xs: '0.875rem', sm: '0.95rem' },
                color: t.textSecondary,
                [hoverCapable]: {
                  '&:hover': { color: t.accent, backgroundColor: t.accentSoft },
                },
              }}
            >
              View screenshots
            </Button>

            
          </Stack>
        </Box>
      </Box>

      <GalleryDialog
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        images={project.images}
        title={project.title}
        initialIndex={galleryIndex}
      />
    </Box>
  );
};

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export const Projects: React.FC = () => {
  const t = useProjectTokens();

  if (projectsData.length === 0) {
    return null;
  }

  return (
    <Box
      id="projects"
      component="section"
      sx={{
        py: { xs: 6, sm: 8, md: 10, lg: 12 },
        backgroundColor: t.bg,
        color: t.textPrimary,
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 3, md: 4 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 5, sm: 6, md: 7 } }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 1.4rem + 1.5vw, 2.75rem)',
              color: t.textPrimary,
              letterSpacing: '0.3px',
              mb: 1.25,
              mt: 4,
            }}
          >
            Featured <Box component="span" sx={{ color: t.accent }}>Projects</Box>
          </Typography>
          <Typography
            sx={{
              color: t.textSecondary,
              maxWidth: 600,
              mx: 'auto',
              fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
              lineHeight: 1.6,
              px: { xs: 1, sm: 0 },
            }}
          >
            Explore recent software products, applications, and web designs.
          </Typography>
        </Box>

        <Stack spacing={{ xs: 3.5, sm: 4.5, md: 5.5 }}>
          {projectsData.map((project, idx) => (
            <ProjectSpotlight
              key={project.id}
              project={project}
              reversed={idx % 2 === 1}
              index={idx}
              total={projectsData.length}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default Projects;