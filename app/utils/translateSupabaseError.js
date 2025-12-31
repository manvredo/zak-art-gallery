/**
 * Übersetzt Supabase-Fehlermeldungen in die aktuelle Sprache
 * 
 * @param {Error} error - Der Supabase-Fehler
 * @param {Object} t - Übersetzungsobjekt aus LanguageContext
 * @returns {string} - Übersetzte Fehlermeldung
 */
export function translateSupabaseError(error, t) {
  if (!error) return t.auth.errors.genericError;

  const errorMessage = error.message || '';

  // Supabase Error Messages → Übersetzungs-Mapping
  const errorMap = {
    // Registrierungs-Fehler
    'User already registered': t.auth.errors.emailAlreadyExists,
    'Email already exists': t.auth.errors.emailAlreadyExists,
    'User with this email already exists': t.auth.errors.emailAlreadyExists,
    
    // Login-Fehler
    'Invalid login credentials': t.auth.errors.invalidCredentials,
    'Invalid email or password': t.auth.errors.invalidCredentials,
    'Email not confirmed': t.auth.errors.emailNotConfirmed,
    
    // Validierungs-Fehler
    'Password should be at least 6 characters': t.auth.errors.passwordTooShort,
    'Signup requires a valid password': t.auth.errors.weakPassword,
    'Invalid email': t.auth.errors.invalidEmail,
    
    // Allgemeine Fehler
    'Network request failed': t.auth.errors.genericError,
  };

  // Exakte Übereinstimmung suchen
  if (errorMap[errorMessage]) {
    return errorMap[errorMessage];
  }

  // Teilweise Übereinstimmung suchen (falls Supabase Fehler variiert)
  for (const [key, value] of Object.entries(errorMap)) {
    if (errorMessage.includes(key)) {
      return value;
    }
  }

  // Falls keine Übersetzung gefunden: Original-Fehler oder Generic
  return errorMessage || t.auth.errors.genericError;
}