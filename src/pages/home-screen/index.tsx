import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface SkillCategory {
  title: string;
  skills: string[];
}

interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  responsibilities: string[];
}

interface EducationEntry {
  title: string;
  institution: string;
  location: string;
  period: string;
  description?: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Development',
    skills: ['React.js', 'React Native', 'Next.js', 'HTML', 'CSS', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Backend Development',
    skills: ['Java', 'Spring Boot', 'Python', 'Node.js', 'Express.js'],
  },
  {
    title: 'Database & Backend Services',
    skills: ['Supabase', 'MySQL', 'PostgreSQL'],
  },
  {
    title: 'Tools & Version Control',
    skills: ['Git', 'GitHub'],
  },
  {
  title: 'Soft Skills',
  skills: [
    'Effective Communication',
    'Team Collaboration',
    'Problem Solving',
    'Time Management',
    'Multitasking',
    'Adaptability',
  ],
}
];

const experienceData: ExperienceEntry[] = [
  {
    role: 'Java Full Stack Developer (Trainee)',
    company: 'Algorian Software Solutions',
    location: 'Dindigul, Tamil Nadu',
    period: '2026 - Present',
    type: 'Full-time Trainee',
    responsibilities: [
      'Building responsive frontend web interfaces with React.js and cross-platform mobile features using React Native.',
      'Designing and developing scalable RESTful backend APIs with Java and Spring Boot, ensuring reliable validation and global error handling layers.',
      'Managing relational database schemas, query optimizations, and data persistence operations using MySQL.',
      'Implementing global state management solutions and optimizing API client responses for seamless frontend-backend integration.',
      'Conducting regular code reviews, unit testing, and component debugging to maintain codebase health and performance standards.',
      'Collaborating in an Agile startup ecosystem using Git/GitHub for continuous integration, code versioning, and feature delivery.',
    ],
  },
];

const educationData: EducationEntry[] = [
  {
    title: 'Bachelor of Computer Application (BCA)',
    institution: 'Kongu Arts and Science College, Bharathiar University',
    location: 'Coimbatore, India',
    period: 'Graduated 2025',
    description: '3-year degree program covering core computer science fundamentals, programming, and software development.',
  },
  {
    title: 'Java Full Stack Development',
    institution: 'QSpiders-Velachery',
    location: 'Chennai, India',
    period: '2025',
    description:
      'Hands-on training in Java, Spring Boot, databases, and frontend technologies, with practical experience building full-stack applications after completing the BCA program.',
  },
];

/* ------------------------------------------------------------------ */
/* Theme-derived tokens.                                               */
/* Every color below is computed from `theme`, so it automatically     */
/* flips when the user toggles dark/light via ThemeProvider.           */
/* ------------------------------------------------------------------ */
const useSectionTokens = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const accent = theme.palette.primary.main;
  const accentAlt = theme.palette.secondary.main;

  return {
    theme,
    isDark,
    accent,
    accentAlt,
    accentSoft: alpha(accent, isDark ? 0.1 : 0.12),
    accentBorder: alpha(accent, isDark ? 0.15 : 0.3),
    accentBorderHover: alpha(accent, isDark ? 0.35 : 0.5),

    sectionBg: theme.palette.background.default,
    surface: alpha(theme.palette.background.paper, isDark ? 0.6 : 0.9),
    surfaceHoverShadow: alpha(accent, isDark ? 0.08 : 0.12),

    textPrimary: theme.palette.text.primary,
    textSecondary: theme.palette.text.secondary,
    // Body copy sits a shade lighter than primary in dark mode, a shade
    // softer than primary in light mode — matches the original design's
    // three-tier text hierarchy without hardcoding hex values.
    textBody: alpha(theme.palette.text.primary, isDark ? 0.82 : 0.75),

    divider: alpha(theme.palette.text.primary, isDark ? 0.08 : 0.1),
    hairline: alpha(theme.palette.text.primary, isDark ? 0.06 : 0.08),

    chipBg: alpha(theme.palette.text.primary, isDark ? 0.05 : 0.04),
    chipBorder: alpha(theme.palette.text.primary, isDark ? 0.1 : 0.12),

    cardBg: alpha(theme.palette.text.primary, isDark ? 0.02 : 0.03),
    cardBorder: alpha(theme.palette.text.primary, isDark ? 0.06 : 0.08),

    dotBg: theme.palette.background.default,
  };
};

const EducationCard: React.FC<{ entry: EducationEntry; isLast: boolean }> = ({ entry, isLast }) => {
  const t = useSectionTokens();

  return (
    <Box
      sx={{
        position: 'relative',
        pl: { xs: 2.5, sm: 3 },
        pr: { xs: 1, sm: 1.5 },
        py: 1,
        pb: isLast ? 1 : { xs: 2.5, sm: 3 },
        borderRadius: '10px',
        cursor: 'pointer',
        borderLeft: `2px solid ${t.accentBorder}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          borderColor: t.accent,
          backgroundColor: t.accentSoft,
          '& .timeline-dot': {
            boxShadow: `0 0 12px ${t.accent}`,
            transform: 'scale(1.3)',
            backgroundColor: t.accent,
          },
        },
      }}
    >
      <Box
        className="timeline-dot"
        sx={{
          position: 'absolute',
          left: { xs: -6, sm: -7 },
          top: 14,
          width: { xs: 10, sm: 12 },
          height: { xs: 10, sm: 12 },
          borderRadius: '50%',
          backgroundColor: t.dotBg,
          border: `2px solid ${t.accent}`,
          boxShadow: `0 0 6px ${alpha(t.accent, 0.4)}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 700, color: t.textPrimary, lineHeight: 1.35, fontSize: { xs: '0.95rem', sm: '1rem' } }}
      >
        {entry.title}
      </Typography>

      <Typography variant="body2" sx={{ color: t.accent, fontWeight: 600, mt: 0.25, fontSize: { xs: '0.82rem', sm: '0.875rem' } }}>
        {entry.institution}
      </Typography>

      <Stack
        direction="row"
        spacing={{ xs: 1.25, sm: 2 }}
        sx={{ mt: 0.75, color: t.textSecondary, fontSize: { xs: '0.7rem', sm: '0.75rem' }, flexWrap: 'wrap', rowGap: 0.5 }}
      >
        <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LocationOnIcon sx={{ fontSize: 14 }} /> {entry.location}
        </Box>
        <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <CalendarTodayIcon sx={{ fontSize: 12 }} /> {entry.period}
        </Box>
      </Stack>

      {entry.description && (
        <Typography
          variant="body2"
          sx={{ color: t.textSecondary, mt: 1, lineHeight: 1.6, fontSize: { xs: '0.82rem', sm: '0.875rem' } }}
        >
          {entry.description}
        </Typography>
      )}
    </Box>
  );
};

export const HomeScreen: React.FC = () => {
  const t = useSectionTokens();

  return (
    <Box
      id="about"
      component="section"
      sx={{
        py: { xs: 6, sm: 8, md: 10, lg: 12 },
        backgroundColor: t.sectionBg,
        color: t.textPrimary,
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Section Title */}
        <Box
          sx={{
            mb: { xs: 5, sm: 6, md: 8 },
            textAlign: 'center',
            cursor: 'default',
            display: 'inline-block',
            width: '100%',
            '&:hover .about-title': {
              letterSpacing: '0.5px',
              textShadow: `0 0 20px ${alpha(t.accent, 0.3)}`,
            },
          }}
        >
          <Typography
            className="about-title"
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.75rem', sm: '2.1rem', md: '2.5rem', lg: '2.75rem' },
              background: `linear-gradient(135deg, ${t.textPrimary} 0%, ${t.textSecondary} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              mt: 3,
            }}
          >
            About <span style={{ color: t.accent }}>Me</span>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: t.textSecondary,
              maxWidth: '600px',
              mx: 'auto',
              fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
              px: { xs: 2, sm: 0 },
            }}
          >
            A quick overview of my background, academic journey, work experience, and technical skill set.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 3, sm: 4 }}>
          {/* Left Column: Personal Bio & Education */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3, md: 4 },
                height: '100%',
                backgroundColor: t.surface,
                backdropFilter: 'blur(16px)',
                border: `1px solid ${t.accentBorder}`,
                borderRadius: { xs: '16px', sm: '20px' },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  borderColor: t.accentBorderHover,
                  boxShadow: `0 8px 30px ${t.surfaceHoverShadow}`,
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: t.textPrimary,
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: { xs: '1.15rem', sm: '1.3rem', md: '1.5rem' },
                }}
              >
                <CodeIcon sx={{ color: t.accent, fontSize: { xs: 20, sm: 24 } }} /> Who I Am
              </Typography>

              {/* Interactive Bio Card */}
              <Box
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backgroundColor: 'transparent',
                  border: '1px solid transparent',
                  '&:hover': {
                    backgroundColor: t.accentSoft,
                    borderColor: t.accentBorder,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: t.textBody, lineHeight: 1.8, fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' } }}
                >
                  I’m a passionate software developer focused on building modern, scalable, and user-friendly applications. I specialize in Java, Spring Boot, React.js, and React Native, with a strong interest in developing clean and efficient solutions. I enjoy solving complex problems, learning new technologies, and creating reliable applications with a focus on performance, maintainability, and great user experiences.
                </Typography>
              </Box>

              <Divider sx={{ borderColor: t.hairline, my: { xs: 2, sm: 3 } }} />

              {/* Education Section */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: t.textPrimary,
                  mb: { xs: 2, sm: 2.5 },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                }}
              >
                <SchoolIcon sx={{ color: t.accentAlt, fontSize: { xs: 18, sm: 22 } }} /> Education
              </Typography>

              <Stack spacing={0.5}>
                {educationData.map((entry, i) => (
                  <EducationCard key={entry.title} entry={entry} isLast={i === educationData.length - 1} />
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* Right Column: Experience */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3, md: 4 },
                height: '100%',
                backgroundColor: t.surface,
                backdropFilter: 'blur(16px)',
                border: `1px solid ${t.accentBorder}`,
                borderRadius: { xs: '16px', sm: '20px' },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  borderColor: t.accentBorderHover,
                  boxShadow: `0 8px 30px ${t.surfaceHoverShadow}`,
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: t.textPrimary,
                  mb: { xs: 2, sm: 3 },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: { xs: '1.15rem', sm: '1.3rem', md: '1.5rem' },
                }}
              >
                <WorkIcon sx={{ color: t.accent, fontSize: { xs: 20, sm: 24 } }} /> Work Experience
              </Typography>

              <Stack spacing={{ xs: 2, sm: 3 }}>
                {experienceData.map((exp, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: { xs: 2, sm: 2.5 },
                      borderRadius: { xs: '12px', sm: '14px' },
                      cursor: 'pointer',
                      backgroundColor: t.cardBg,
                      border: `1px solid ${t.cardBorder}`,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        backgroundColor: t.accentSoft,
                        borderColor: t.accentBorderHover,
                        transform: { xs: 'none', sm: 'translateY(-3px)' },
                        boxShadow: `0 6px 20px ${t.surfaceHoverShadow}`,
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1, mb: 0.5 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700, color: t.textPrimary, lineHeight: 1.3, fontSize: { xs: '0.95rem', sm: '1rem' } }}
                      >
                        {exp.role}
                      </Typography>
                      <Chip
                        label={exp.period}
                        size="small"
                        sx={{
                          backgroundColor: t.accentSoft,
                          color: t.accent,
                          fontWeight: 700,
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          border: `1px solid ${t.accentBorder}`,
                        }}
                      />
                    </Box>

                    <Typography variant="body2" sx={{ color: t.accent, fontWeight: 600, mb: 1, fontSize: { xs: '0.82rem', sm: '0.875rem' } }}>
                      {exp.company}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={{ xs: 1.25, sm: 2 }}
                      sx={{ mb: 2, color: t.textSecondary, fontSize: { xs: '0.7rem', sm: '0.75rem' }, flexWrap: 'wrap', rowGap: 0.5 }}
                    >
                      <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOnIcon sx={{ fontSize: 14 }} /> {exp.location}
                      </Box>
                      <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <WorkIcon sx={{ fontSize: 12 }} /> {exp.type}
                      </Box>
                    </Stack>

                    <Box component="ul" sx={{ pl: { xs: 2.25, sm: 2.5 }, m: 0, color: t.textBody, fontSize: { xs: '0.8rem', sm: '0.875rem' }, '& li': { mb: 1 } }}>
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx}>
                          <Typography variant="body2" sx={{ color: t.textBody, lineHeight: 1.6, fontSize: 'inherit' }}>
                            {resp}
                          </Typography>
                        </li>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Bottom Section: My Skills */}
        <Box id="skills" sx={{ mt: { xs: 6, sm: 8, md: 10 } }}>
          <Box
            sx={{
              textAlign: 'center',
              mb: { xs: 4, sm: 5 },
              cursor: 'default',
              display: 'inline-block',
              width: '100%',
              '&:hover .skills-title': {
                letterSpacing: '0.5px',
                textShadow: `0 0 20px ${alpha(t.accent, 0.3)}`,
              },
            }}
          >
            <Typography
              className="skills-title"
              variant="h4"
              component="h3"
              sx={{
                fontWeight: 800,
                color: t.textPrimary,
                mb: 1,
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              My <span style={{ color: t.accent }}>Skills</span>
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: t.textSecondary, fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' }, px: { xs: 2, sm: 0 } }}
            >
              Technologies, frameworks, and tools I work with regularly.
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {skillCategories.map((cat, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.25, sm: 3 },
                    height: '100%',
                    cursor: 'pointer',
                    backgroundColor: t.surface,
                    backdropFilter: 'blur(16px)',
                    border: `1px solid ${t.accentBorder}`,
                    borderRadius: { xs: '16px', sm: '20px' },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: { xs: 'none', sm: 'translateY(-3px)' },
                      borderColor: t.accentBorderHover,
                      boxShadow: `0 8px 30px ${t.surfaceHoverShadow}`,
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, color: t.textPrimary, mb: 2, fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' } }}>
                    {cat.title}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 0.75, sm: 1 } }}>
                    {cat.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        sx={{
                          color: t.textBody,
                          backgroundColor: t.chipBg,
                          border: `1px solid ${t.chipBorder}`,
                          fontSize: { xs: '0.75rem', sm: '0.85rem' },
                          height: { xs: 28, sm: 32 },
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            color: t.textPrimary,
                            backgroundColor: alpha(t.accent, 0.15),
                            borderColor: t.accent,
                            boxShadow: `0 0 10px ${alpha(t.accent, 0.3)}`,
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeScreen;