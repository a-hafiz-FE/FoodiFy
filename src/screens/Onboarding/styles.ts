import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const colors = {
  primary: '#4058A0',
  accent: '#DEE21B',
  coral: '#FF6347',
  lime: '#C8D616',
  dark: '#1E1E1E',
  white: '#FFFFFF',
  grey: '#999',
  inputBorder: '#D0D0D0',
  inputBg: '#F9F9F9',
};

export const styles = StyleSheet.create({
  // ── Shared ──────────────────────────────────────
  page: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoSmall: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  dotActive: {
    backgroundColor: colors.accent,
    width: 24,
    height: 10,
    borderRadius: 5,
  },

  // ── Splash ─────────────────────────────────────
  splashContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  splashTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.white,
    fontStyle: 'italic',
  },

  // ── Intro slides ───────────────────────────────
  introContainer: {
    flex: 1,
  },
  introSlide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  introImagesRow: {
    alignItems: 'center',
    gap: 14,
    marginTop: 40,
  },
  introPlateImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  introTextBox: {
    backgroundColor: colors.dark,
    paddingHorizontal: 30,
    paddingVertical: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
    alignItems: 'center',
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
  },
  goButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  goButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.dark,
  },
  progressButtonWrap: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  progressRingSvg: {
    position: 'absolute',
  },
  goButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Auth shared ────────────────────────────────
  authContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  authHeaderImage: {
    width: '100%',
    height: height * 0.28,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  authBody: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    alignItems: 'center',
  },
  authTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.dark,
    marginTop: 8,
  },
  authSubtitle: {
    fontSize: 20,
    color: colors.coral,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputBg,
    paddingHorizontal: 20,
    fontSize: 15,
    marginBottom: 14,
    color: colors.dark,
  },
  linkText: {
    color: colors.primary,
    fontSize: 13,
    marginBottom: 8,
  },
  termsText: {
    color: colors.coral,
    fontSize: 12,
    textDecorationLine: 'underline',
    marginBottom: 16,
  },
  primaryButton: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.inputBorder,
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 13,
    color: colors.grey,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 20,
    marginVertical: 12,
  },
  socialIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomLink: {
    flexDirection: 'row',
    marginTop: 8,
  },
  bottomLinkText: {
    fontSize: 14,
    color: colors.grey,
  },
  bottomLinkAction: {
    fontSize: 14,
    color: colors.coral,
    fontWeight: '600',
    marginLeft: 4,
  },

  // ── Verify Phone ───────────────────────────────
  phoneRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    marginBottom: 14,
  },
  countryPicker: {
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputBg,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  phoneInput: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputBg,
    paddingHorizontal: 20,
    fontSize: 15,
    color: colors.dark,
  },

  // ── OTP ────────────────────────────────────────
  otpInfoText: {
    fontSize: 14,
    color: colors.grey,
    textAlign: 'center',
    marginBottom: 6,
  },
  otpPhoneText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: 20,
  },
  otpRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputBg,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: colors.dark,
  },
  otpBoxFocused: {
    borderColor: colors.primary,
  },
  resendText: {
    color: colors.primary,
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline',
  },

  // ── Verify header (shared between phone & otp) ─
  verifyContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  verifyHeaderImage: {
    width: '100%',
    height: height * 0.3,
  },
  verifyBody: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 16,
  },
  verifyLogoRow: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  verifyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: 20,
  },
});
