import { promises as dns } from "dns";

/**
 * Validates an email address by checking:
 * 1. Basic syntax using regex
 * 2. Disposable domain blacklist
 * 3. MX DNS records (to ensure domain can receive emails)
 *
 * @param {string} email
 * @returns {Promise<boolean>}
 */
async function validEmail(email) {
  // 1. Basic regex for general format (case-insensitive)
  const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  if (!regex.test(email)) {
    console.log(`❌ Invalid email format: ${email}`);
    return false;
  }

  // 2. Extract domain and check against known disposable domains
  const domain = email.split("@").pop().toLowerCase();
  const disposableDomains = new Set([
    "mailinator.com",
    "yopmail.com",
    "tempmail.com",
    "10minutemail.com",
    "guerrillamail.com",
    "discard.email",
    // ✅ You can expand this list or load from a file
  ]);

  if (disposableDomains.has(domain)) {
    console.log(`❌ Disposable email domain blocked: ${domain}`);
    return false;
  }

  // 3. Check if domain has MX records (can receive emails)
  try {
    const mxRecords = await dns.resolveMx(domain);

    if (!mxRecords || mxRecords.length === 0) {
      console.log(`❌ No MX records found for: ${domain}`);
      return false;
    }

    console.log(`✅ MX records found for: ${domain}`);
    return true;
  } catch (e) {
    if (e.code === "ENOTFOUND" || e.code === "NXDOMAIN") {
      console.log(`❌ Domain not found: ${domain}`);
    } else {
      console.error(`❌ DNS error for ${domain}:`, e.message);
    }
    return false;
  }
}

export default validEmail;
