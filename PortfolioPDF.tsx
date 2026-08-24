import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
  Image
} from '@react-pdf/renderer';

// Register standard Helvetica fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'Helvetica' },
    { src: 'Helvetica-Bold', fontWeight: 'bold' },
    { src: 'Helvetica-Oblique', fontStyle: 'italic' }
  ]
});

// Color Scheme - Elegant Light Mode Theme matching Zain's template
const colors = {
  bgDark: '#f8f8f8',       // Light background gray
  bgCard: '#ffffff',       // Pure white cards
  textPrimary: '#2b2b2b',  // Dark Gray
  textSecondary: '#5a5a5a',// Medium Gray
  textMuted: '#888888',    // Muted Gray
  accent: '#1e40af',       // Deep Navy/Blue for better contrast
  border: '#d4d4d8',       // Soft light border (Zinc 300)
  success: '#059669',      // Darker emerald for text contrast
  successBg: '#ecfdf5'     // Soft green background for cert badge
};

const styles = StyleSheet.create({
  // Page setup
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: colors.bgDark,
    color: colors.textPrimary,
    padding: 30,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  // Slide Header
  slideHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 8,
    marginBottom: 15,
  },
  slideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  slideSubtitle: {
    fontSize: 9,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Slide Footer
  slideFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
    marginTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  pageNum: {
    fontSize: 8,
    color: colors.accent,
    fontWeight: 'bold',
  },

  // Content Containers
  contentGrid: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  column: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 10,
  },
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  // Slide 1: Cover Layout
  coverContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 30,
  },
  coverLeft: {
    flex: 1.2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  coverRight: {
    flex: 0.8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverDecorativeLine: {
    width: 60,
    height: 3,
    backgroundColor: colors.accent,
    marginBottom: 15,
    borderRadius: 1.5,
  },
  coverName: {
    fontSize: 34,
    fontWeight: 'bold',
    color: colors.textPrimary,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  coverTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 15,
  },
  coverDesc: {
    fontSize: 10,
    color: colors.textMuted,
    lineHeight: 1.5,
  },
  coverPhotoFrame: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 3,
    borderColor: colors.accent,
    overflow: 'hidden',
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  // Slide 2: About Me details
  bioText: {
    fontSize: 9.5,
    color: colors.textSecondary,
    lineHeight: 1.5,
  },
  statsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 5,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
  },
  statNum: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.accent,
  },
  statLabel: {
    fontSize: 7.5,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  certBadge: {
    borderColor: colors.success,
    borderWidth: 1,
    backgroundColor: colors.successBg,
    padding: 10,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  certLeft: {
    flex: 1,
  },
  certRight: {
    width: 110,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  certTag: {
    fontSize: 7,
    fontWeight: 'bold',
    color: colors.success,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 3,
  },
  certTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 3,
  },
  certLink: {
    fontSize: 7.5,
    color: colors.accent,
    textDecoration: 'underline',
    marginTop: 4,
  },
  certImagePreview: {
    width: 100,
    height: 75,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },

  // Slide 3: Experience items
  expItem: {
    borderLeftWidth: 2,
    borderLeftColor: colors.accent,
    paddingLeft: 10,
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  expCompanyLogo: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: colors.border,
    objectFit: 'contain',
  },
  expBody: {
    flex: 1,
  },
  expHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  expRole: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  expCompany: {
    fontSize: 9,
    color: colors.accent,
    fontWeight: 'bold',
  },
  expDate: {
    fontSize: 8,
    color: colors.textMuted,
  },
  expDesc: {
    fontSize: 8.5,
    color: colors.textSecondary,
    lineHeight: 1.35,
    marginTop: 2,
  },
  expTags: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 4,
  },
  expTag: {
    fontSize: 7,
    backgroundColor: colors.border,
    paddingVertical: 1.5,
    paddingHorizontal: 5,
    borderRadius: 3,
    color: colors.textSecondary,
  },

  // Slide 4: Skills Section
  skillCategoryTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  skillGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillBubble: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  skillText: {
    fontSize: 8.5,
    color: colors.textPrimary,
  },

  // Project Slides (Apple Developer Academy Standards)
  projSlideContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  projLeftCol: {
    flex: 1.25,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  projRightCol: {
    flex: 0.75,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  projCategory: {
    fontSize: 8,
    fontWeight: 'bold',
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  projName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  projContextLine: {
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.success,
    marginTop: 2,
  },
  projMetaRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 4,
    marginBottom: 4,
  },
  projMetaItem: {
    fontSize: 8,
    color: colors.textMuted,
  },
  projSectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.accent,
    marginTop: 4,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  projText: {
    fontSize: 8.5,
    color: colors.textSecondary,
    lineHeight: 1.35,
  },
  projBigImageFrame: {
    width: 260,
    height: 165,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  projBigImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  projLinkBtn: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 20,
    fontSize: 8.5,
    color: colors.accent,
    fontWeight: 'bold',
    textDecoration: 'none',
  },

  // Slide 10: Contact Info
  contactGrid: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  contactCard: {
    width: '45%',
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  contactLabel: {
    fontSize: 7.5,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  contactVal: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  backCoverLogo: {
    width: 50,
    height: 50,
    objectFit: 'contain',
    marginBottom: 10,
  }
});

export const PortfolioPDF = () => (
  <Document title="Zain_Ammar_Portfolio_Academy" author="Zain Ammar">
    
    {/* =========================================================================
        SLIDE 1: COVER PAGE
        ========================================================================= */}
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.coverContent}>
        <View style={styles.coverLeft}>
          <View style={styles.coverDecorativeLine} />
          <Text style={styles.coverName}>Zain Ammar</Text>
          <Text style={styles.coverTitle}>UI/UX Researcher & System Analyst</Text>
          <Text style={styles.coverDesc}>
            Creating innovative digital experiences with passion and precision. 
            Bridging the gap between user needs, backend systems, and beautiful layouts.
            Portfolio prepared for Apple Developer Academy Indonesia.
          </Text>
        </View>
        <View style={styles.coverRight}>
          <View style={styles.coverPhotoFrame}>
            <Image src="img/profile.jpg" style={styles.coverPhoto} />
          </View>
        </View>
      </View>
      <View style={styles.slideFooter}>
        <Text style={styles.footerText}>Zain Ammar &mdash; Apple Developer Academy Portfolio</Text>
        <Text style={styles.pageNum}>01</Text>
      </View>
    </Page>

    {/* =========================================================================
        SLIDE 2: ABOUT ME & CERTIFICATION
        ========================================================================= */}
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.slideHeader}>
        <Text style={styles.slideTitle}>About Me</Text>
        <Text style={styles.slideSubtitle}>Professional Profile</Text>
      </View>

      <View style={styles.contentGrid}>
        <View style={styles.column}>
          <View style={styles.card}>
            <Text style={styles.bioText}>
              Final year Undergraduate student at the Faculty of Industrial Engineering, Telkom University, majoring in Information Systems. Strongly interested in UI/UX Design, UX Research, Quality Assurance, System Analysis, and Project Management. Diligent, detail-oriented, and strives for continuous growth.
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.bioText}>
              Currently working as a UI/UX Researcher Intern at Telkomsel, specializing in smart care tools optimization, conducting qualitative user research, and documenting requirements.
            </Text>
          </View>
        </View>

        <View style={styles.column}>
          <View style={[styles.card, styles.certBadge]}>
            <View style={styles.certLeft}>
              <Text style={styles.certTag}>International Credential</Text>
              <Text style={styles.certTitle}>CDA &mdash; Certified Data Analyst</Text>
              <Text style={styles.bioText}>
                Pearson VUE & Certiport Certified Data Analytics specialist. Validates capability to deliver data-backed system analysis and research insights.
              </Text>
              <Link 
                src="https://drive.google.com/file/d/1naVrBnNAsUKPeCKnYGRGngLbzcCkkX6L/view?usp=sharing"
                style={styles.certLink}
              >
                Verify Credentials &rarr;
              </Link>
            </View>
            <View style={styles.certRight}>
              <Image src="img/cda-certificate.png" style={styles.certImagePreview} />
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>12+</Text>
              <Text style={styles.statLabel}>Completed Projects</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>280+</Text>
              <Text style={styles.statLabel}>Impacted Users</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>2+</Text>
              <Text style={styles.statLabel}>Years Experience</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.slideFooter}>
        <Text style={styles.footerText}>Zain Ammar &mdash; Apple Developer Academy Portfolio</Text>
        <Text style={styles.pageNum}>02</Text>
      </View>
    </Page>

    {/* =========================================================================
        SLIDE 3: WORK EXPERIENCE
        ========================================================================= */}
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.slideHeader}>
        <Text style={styles.slideTitle}>Work Experience</Text>
        <Text style={styles.slideSubtitle}>Career Timeline</Text>
      </View>

      <View style={styles.contentGrid}>
        <View style={styles.column}>
          <View style={[styles.card, styles.expItem]}>
            <Image src="img/telkomsel-t.png" style={styles.expCompanyLogo} />
            <View style={styles.expBody}>
              <View style={styles.expHeader}>
                <Text style={styles.expRole}>UI/UX Researcher Intern</Text>
                <Text style={styles.expDate}>Sep 2024 - Dec 2024</Text>
              </View>
              <Text style={styles.expCompany}>Telkomsel</Text>
              <Text style={styles.expDesc}>
                Led research on Digital Smart Care (DSC) application. Identified 54 new capabilities. Conducted user interviews and field observations with Grapari staff.
              </Text>
              <View style={styles.expTags}>
                <Text style={styles.expTag}>User Research</Text>
                <Text style={styles.expTag}>Figma</Text>
                <Text style={styles.expTag}>Product Requirements</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.column}>
          <View style={[styles.card, styles.expItem]}>
            <Image src="img/telkom-university-logo.png" style={styles.expCompanyLogo} />
            <View style={styles.expBody}>
              <View style={styles.expHeader}>
                <Text style={styles.expRole}>Master of Content Planner</Text>
                <Text style={styles.expDate}>Nov 2022 - Nov 2025</Text>
              </View>
              <Text style={styles.expCompany}>Telkom University Jakarta</Text>
              <Text style={styles.expDesc}>
                Developed 3 content series achieving 1M+ views and 61.2K+ likes. Generated monthly analytics reports. Awarded Best Manager Digital Team (August 2023).
              </Text>
              <View style={styles.expTags}>
                <Text style={styles.expTag}>Content Strategy</Text>
                <Text style={styles.expTag}>Social Media</Text>
                <Text style={styles.expTag}>Team Lead</Text>
              </View>
            </View>
          </View>

          <View style={[styles.card, styles.expItem]}>
            <Image src="img/blu-logo.png" style={styles.expCompanyLogo} />
            <View style={styles.expBody}>
              <View style={styles.expHeader}>
                <Text style={styles.expRole}>Blu Ambassador</Text>
                <Text style={styles.expDate}>2023 - 2024</Text>
              </View>
              <Text style={styles.expCompany}>BCA Digital (blu by BCA Digital)</Text>
              <Text style={styles.expDesc}>
                Educated community on digital banking services and financial literacy. Supported community outreach programs.
              </Text>
              <View style={styles.expTags}>
                <Text style={styles.expTag}>Community Building</Text>
                <Text style={styles.expTag}>Brand Awareness</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.slideFooter}>
        <Text style={styles.footerText}>Zain Ammar &mdash; Apple Developer Academy Portfolio</Text>
        <Text style={styles.pageNum}>03</Text>
      </View>
    </Page>

    {/* =========================================================================
        SLIDE 4: TECHNICAL SKILLS
        ========================================================================= */}
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.slideHeader}>
        <Text style={styles.slideTitle}>Technical Skills</Text>
        <Text style={styles.slideSubtitle}>Expertise & Stack</Text>
      </View>

      <View style={styles.contentGrid}>
        <View style={styles.column}>
          <View style={styles.card}>
            <Text style={styles.skillCategoryTitle}>UI/UX Design & Research</Text>
            <View style={styles.skillGrid}>
              <View style={styles.skillBubble}><Text style={styles.skillText}>Figma</Text></View>
              <View style={styles.skillBubble}><Text style={styles.skillText}>FigJam</Text></View>
              <View style={styles.skillBubble}><Text style={styles.skillText}>Miro</Text></View>
              <View style={styles.skillBubble}><Text style={styles.skillText}>User Interviews</Text></View>
              <View style={styles.skillBubble}><Text style={styles.skillText}>Usability Testing</Text></View>
              <View style={styles.skillBubble}><Text style={styles.skillText}>Wireframing</Text></View>
              <View style={styles.skillBubble}><Text style={styles.skillText}>Prototyping</Text></View>
            </View>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.skillCategoryTitle}>System Analysis & Management</Text>
            <View style={styles.skillGrid}>
              <View style={styles.skillBubble}><Text style={styles.skillText}>JIRA</Text></View>
              <View style={styles.skillBubble}><Text style={styles.skillText}>Agile Scrum</Text></View>
              <View style={styles.skillBubble}><Text style={styles.skillText}>UML Modeling</Text></View>
              <View style={styles.skillBubble}><Text style={styles.skillText}>System Requirements</Text></View>
              <View style={styles.skillBubble}><Text style={styles.skillText}>Product Roadmaps</Text></View>
            </View>
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.card}>
            <Text style={styles.skillCategoryTitle}>Front-End Development</Text>
            <View style={styles.skillGrid}>
              <View style={styles.skillBubble}><Text style={styles.skillText}>React</Text></View>
              <View style={styles.skillBubble}><Text style={styles.skillText}>Next.js</Text></View>
              <View style={styles.skillBubble}><Text style={styles.skillText}>Tailwind CSS</Text></View>
              <View style={styles.skillBubble}><Text style={styles.skillText}>JavaScript (ES6)</Text></View>
              <View style={styles.skillBubble}><Text style={styles.skillText}>Vite</Text></View>
              <View style={styles.skillBubble}><Text style={styles.skillText}>HTML5 / CSS3</Text></View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.skillCategoryTitle}>Back-End & Databases</Text>
            <View style={styles.skillGrid}>
              <View style={styles.skillBubble}><Text style={styles.skillText}>Laravel</Text></View>
              <View style={styles.skillBubble}><Text style={styles.skillText}>PHP</Text></View>
              <View style={styles.skillBubble}><Text style={styles.skillText}>MySQL</Text></View>
              <View style={styles.skillBubble}><Text style={styles.skillText}>Git Version Control</Text></View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.slideFooter}>
        <Text style={styles.footerText}>Zain Ammar &mdash; Apple Developer Academy Portfolio</Text>
        <Text style={styles.pageNum}>04</Text>
      </View>
    </Page>

    {/* =========================================================================
        SLIDE 5: PROJECT 1 - XENA
        ========================================================================= */}
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.slideHeader}>
        <Text style={styles.slideTitle}>Project Showcase</Text>
        <Text style={styles.slideSubtitle}>1 of 5</Text>
      </View>

      <View style={styles.projSlideContainer}>
        <View style={styles.projLeftCol}>
          <Text style={styles.projCategory}>Final Thesis Project</Text>
          <Text style={styles.projName}>XENA</Text>
          <Text style={styles.projContextLine}>Work Assignment (GROUP PROJECT) | Role: UI/UX Researcher & System Analyst</Text>
          
          <View style={styles.projMetaRow}>
            <Text style={styles.projMetaItem}>Date: Nov 2025 - Jul 2026 (Completed 22 July 2026)</Text>
            <Text style={styles.projMetaItem}>Org: Telkomsel Internship</Text>
            <Text style={styles.projMetaItem}>Tech: Figma, Laravel, PHP, Tailwind CSS, JS, MySQL</Text>
          </View>

          <Text style={styles.projSectionTitle}>Project Summary</Text>
          <Text style={styles.projText}>
            A redesigned ticketing and dispatcher work order management system, originating from user research during a Telkomsel internship and successfully completed as a final graduation thesis on July 22, 2026.
          </Text>

          <Text style={styles.projSectionTitle}>Impact Made</Text>
          <Text style={styles.projText}>
            Identified 54 new system capabilities through interviews and direct shadowing with IPTV agents. Streamlined operational dispatcher allocation flows to reduce ticket processing delays.
          </Text>

          <Text style={styles.projSectionTitle}>Key Learnings</Text>
          <Text style={styles.projText}>
            Acquired advanced skills in translating qualitative customer field observations into technical system requirements, modeling workflows, and implementing Prototyping methodologies.
          </Text>
        </View>

        <View style={styles.projRightCol}>
          <View style={styles.projBigImageFrame}>
            <Image src="img/xena-preview.png" style={styles.projBigImage} />
          </View>
          <Link src="https://github.com/zaainamr/ta-xena" style={styles.projLinkBtn}>
            View GitHub Repository &rarr;
          </Link>
        </View>
      </View>

      <View style={styles.slideFooter}>
        <Text style={styles.footerText}>Zain Ammar &mdash; Apple Developer Academy Portfolio</Text>
        <Text style={styles.pageNum}>05</Text>
      </View>
    </Page>

    {/* =========================================================================
        SLIDE 6: PROJECT 2 - MCORDER
        ========================================================================= */}
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.slideHeader}>
        <Text style={styles.slideTitle}>Project Showcase</Text>
        <Text style={styles.slideSubtitle}>2 of 5</Text>
      </View>

      <View style={styles.projSlideContainer}>
        <View style={styles.projLeftCol}>
          <Text style={styles.projCategory}>Capstone Design Project</Text>
          <Text style={styles.projName}>MCORDER</Text>
          <Text style={styles.projContextLine}>Class Assignment (GROUP PROJECT) | Role: Product Owner & Lead System Analyst</Text>
          
          <View style={styles.projMetaRow}>
            <Text style={styles.projMetaItem}>Date: Capstone Design 2025</Text>
            <Text style={styles.projMetaItem}>Org: Telkom University</Text>
            <Text style={styles.projMetaItem}>Tech: Laravel, PHP, Tailwind CSS, MySQL, Agile Scrum</Text>
          </View>

          <Text style={styles.projSectionTitle}>Project Summary</Text>
          <Text style={styles.projText}>
            A web-based stock and material ordering platform developed for McDonald's outlets, allowing Manager Stock and external vendors to coordinate procurement.
          </Text>

          <Text style={styles.projSectionTitle}>Impact Made</Text>
          <Text style={styles.projText}>
            Streamlined communication channels between store managers and procurement vendors. Designed purchase order creation workflows that eliminated documentation errors.
          </Text>

          <Text style={styles.projSectionTitle}>Key Learnings</Text>
          <Text style={styles.projText}>
            Learned to facilitate sprints and backlog grooming in Agile Scrum methodology. Developed rigorous UML systems (sequence and class diagrams) to ensure architecture precision.
          </Text>
        </View>

        <View style={styles.projRightCol}>
          <View style={styles.projBigImageFrame}>
            <Image src="img/mcorder-preview.png" style={styles.projBigImage} />
          </View>
          <Link src="https://github.com/RendyRadithya/McOrder" style={styles.projLinkBtn}>
            View GitHub Repository &rarr;
          </Link>
        </View>
      </View>

      <View style={styles.slideFooter}>
        <Text style={styles.footerText}>Zain Ammar &mdash; Apple Developer Academy Portfolio</Text>
        <Text style={styles.pageNum}>06</Text>
      </View>
    </Page>

    {/* =========================================================================
        SLIDE 7: PROJECT 3 - DASHBOARD ORDER
        ========================================================================= */}
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.slideHeader}>
        <Text style={styles.slideTitle}>Project Showcase</Text>
        <Text style={styles.slideSubtitle}>3 of 5</Text>
      </View>

      <View style={styles.projSlideContainer}>
        <View style={styles.projLeftCol}>
          <Text style={styles.projCategory}>UI Design Project</Text>
          <Text style={styles.projName}>Dashboard Order</Text>
          <Text style={styles.projContextLine}>Work Assignment (INDIVIDUAL PROJECT) | Role: UI Designer & Researcher</Text>
          
          <View style={styles.projMetaRow}>
            <Text style={styles.projMetaItem}>Date: December 2025</Text>
            <Text style={styles.projMetaItem}>Org: Telkomsel</Text>
            <Text style={styles.projMetaItem}>Tech: Figma, UI Design, Dashboard UX, Data Visualization</Text>
          </View>

          <Text style={styles.projSectionTitle}>Project Summary</Text>
          <Text style={styles.projText}>
            A regional order tracking and monitoring dashboard designed for Telkomsel heads to supervise product activations and order logistics at a glance.
          </Text>

          <Text style={styles.projSectionTitle}>Impact Made</Text>
          <Text style={styles.projText}>
            Delivered high-fidelity interactive dashboard screens displaying regional activations, aiding executives in visual forecasting and area target alignment.
          </Text>

          <Text style={styles.projSectionTitle}>Key Learnings</Text>
          <Text style={styles.projText}>
            Mastered principles of data density, information hierarchy, and layout consistency in large-scale enterprise panels. Refined auto-layout and variant component systems in Figma.
          </Text>
        </View>

        <View style={styles.projRightCol}>
          <View style={styles.projBigImageFrame}>
            <Image src="img/dashboard-order.png" style={styles.projBigImage} />
          </View>
        </View>
      </View>

      <View style={styles.slideFooter}>
        <Text style={styles.footerText}>Zain Ammar &mdash; Apple Developer Academy Portfolio</Text>
        <Text style={styles.pageNum}>07</Text>
      </View>
    </Page>

    {/* =========================================================================
        SLIDE 8: PROJECT 4 - HADIR.IN
        ========================================================================= */}
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.slideHeader}>
        <Text style={styles.slideTitle}>Project Showcase</Text>
        <Text style={styles.slideSubtitle}>4 of 5</Text>
      </View>

      <View style={styles.projSlideContainer}>
        <View style={styles.projLeftCol}>
          <Text style={styles.projCategory}>UI/UX Competition Project</Text>
          <Text style={styles.projName}>Hadir.in</Text>
          <Text style={styles.projContextLine}>Self-Initiated (GROUP PROJECT) | Role: UI/UX Designer & Lead UX Researcher</Text>
          
          <View style={styles.projMetaRow}>
            <Text style={styles.projMetaItem}>Date: 2025</Text>
            <Text style={styles.projMetaItem}>Context: UI/UX Hackathon/Competition</Text>
            <Text style={styles.projMetaItem}>Tech: Figma, FigJam, User Research, Mobile Prototyping</Text>
          </View>

          <Text style={styles.projSectionTitle}>Project Summary</Text>
          <Text style={styles.projText}>
            A mobile shift log and scheduling app designed to address unfair shift allocation and wellbeing challenges of on-site retail employees.
          </Text>

          <Text style={styles.projSectionTitle}>Impact Made</Text>
          <Text style={styles.projText}>
            Designed intuitive, high-fidelity scheduling layout and location-tracking systems that received strong accolades in UI/UX competitions.
          </Text>

          <Text style={styles.projSectionTitle}>Key Learnings</Text>
          <Text style={styles.projText}>
            Gained deep insight into empathetic user interviewing of retail staff, mapping onboarding logic, and testing interactive high-fidelity mobile prototypes on actual users.
          </Text>
        </View>

        <View style={styles.projRightCol}>
          <View style={styles.projBigImageFrame}>
            <Image src="img/hadirin-preview.png" style={styles.projBigImage} />
          </View>
        </View>
      </View>

      <View style={styles.slideFooter}>
        <Text style={styles.footerText}>Zain Ammar &mdash; Apple Developer Academy Portfolio</Text>
        <Text style={styles.pageNum}>08</Text>
      </View>
    </Page>

    {/* =========================================================================
        SLIDE 9: PROJECT 5 - DSC RESEARCH
        ========================================================================= */}
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.slideHeader}>
        <Text style={styles.slideTitle}>Project Showcase</Text>
        <Text style={styles.slideSubtitle}>5 of 5</Text>
      </View>

      <View style={styles.projSlideContainer}>
        <View style={styles.projLeftCol}>
          <Text style={styles.projCategory}>User Research Project</Text>
          <Text style={styles.projName}>DSC Research</Text>
          <Text style={styles.projContextLine}>Work Assignment (GROUP PROJECT) | Role: UX Researcher</Text>
          
          <View style={styles.projMetaRow}>
            <Text style={styles.projMetaItem}>Date: Sep 2024 - Dec 2024</Text>
            <Text style={styles.projMetaItem}>Org: Telkomsel</Text>
            <Text style={styles.projMetaItem}>Tech: Empathy Map, Persona, Journey Maps, Shadowing</Text>
          </View>

          <Text style={styles.projSectionTitle}>Project Summary</Text>
          <Text style={styles.projText}>
            A qualitative research study observing Grapari front-office agents during IndiHome customer migrations to find smart care software bottlenecks.
          </Text>

          <Text style={styles.projSectionTitle}>Impact Made</Text>
          <Text style={styles.projText}>
            Uncovered 54 core Grapari agent interface pain points and capability proposals, directly feeding into the product backlog for the next smart care iteration.
          </Text>

          <Text style={styles.projSectionTitle}>Key Learnings</Text>
          <Text style={styles.projText}>
            Refined active direct observation, contextual inquiry, customer journey mapping, and empathy categorization methods to ensure user voices drive software requirements.
          </Text>
        </View>

        <View style={styles.projRightCol}>
          <View style={styles.projBigImageFrame}>
            <Image src="img/dsc-research.png" style={styles.projBigImage} />
          </View>
        </View>
      </View>

      <View style={styles.slideFooter}>
        <Text style={styles.footerText}>Zain Ammar &mdash; Apple Developer Academy Portfolio</Text>
        <Text style={styles.pageNum}>09</Text>
      </View>
    </Page>

    {/* =========================================================================
        SLIDE 10: CONTACT DETAILS (BACK COVER)
        ========================================================================= */}
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.slideHeader}>
        <Text style={styles.slideTitle}>Get In Touch</Text>
        <Text style={styles.slideSubtitle}>Contact Information</Text>
      </View>

      <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Image src="img/logo.png" style={styles.backCoverLogo} />
        
        <View style={styles.contactGrid}>
          <View style={styles.contactCard}>
            <Text style={styles.contactLabel}>Email Address</Text>
            <Text style={styles.contactVal}>zain.falih2003@gmail.com</Text>
          </View>

          <View style={styles.contactCard}>
            <Text style={styles.contactLabel}>Phone / WhatsApp</Text>
            <Text style={styles.contactVal}>+62 851 5686 4662</Text>
          </View>

          <View style={styles.contactCard}>
            <Text style={styles.contactLabel}>LinkedIn</Text>
            <Text style={styles.contactVal}>linkedin.com/in/zainammarfalih</Text>
          </View>

          <View style={styles.contactCard}>
            <Text style={styles.contactLabel}>GitHub Profile</Text>
            <Text style={styles.contactVal}>github.com/zaainamr</Text>
          </View>
        </View>
      </View>

      <View style={styles.slideFooter}>
        <Text style={styles.footerText}>Zain Ammar &mdash; Apple Developer Academy Portfolio</Text>
        <Text style={styles.pageNum}>10</Text>
      </View>
    </Page>

  </Document>
);
