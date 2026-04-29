import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

interface NdaParams {
  fullName: string;
  organization: string;
  ipAddress: string;
  timestampUtc: string; // ISO string
}

/**
 * Generate the signed NDA PDF. Uses pdf-lib's standard Helvetica fonts
 * (no custom embedding) to keep the function bundle small. Page is US Letter.
 */
export async function generateNdaPdf({
  fullName,
  organization,
  ipAddress,
  timestampUtc,
}: NdaParams): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const helv = await pdf.embedFont(StandardFonts.Helvetica);
  const helvBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const page = pdf.addPage([612, 792]); // US Letter
  const { width } = page.getSize();
  const margin = 64;
  const maxWidth = width - margin * 2;
  const ink = rgb(0.11, 0.11, 0.12);
  const muted = rgb(0.36, 0.36, 0.4);

  let y = 720;

  const drawHeading = (text: string, size: number, font = helvBold) => {
    page.drawText(text, { x: margin, y, size, font, color: ink });
    y -= size + 6;
  };

  const drawParagraph = (text: string, size = 11, font = helv) => {
    const words = text.split(/\s+/);
    let line = '';
    const lines: string[] = [];
    for (const word of words) {
      const trial = line ? line + ' ' + word : word;
      if (font.widthOfTextAtSize(trial, size) > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = trial;
      }
    }
    if (line) lines.push(line);
    for (const ln of lines) {
      page.drawText(ln, { x: margin, y, size, font, color: muted });
      y -= size + 4;
    }
    y -= 8;
  };

  // Header
  drawHeading('ONE HUMANITY FOUNDATION', 14);
  drawHeading('Mutual Confidentiality Agreement', 12, helv);
  y -= 8;

  // Parties
  page.drawText(`Between: One Humanity Foundation, a 501(c)(3) corporation`, {
    x: margin, y, size: 11, font: helv, color: ink,
  });
  y -= 16;
  page.drawText(`And: ${fullName} (${organization})`, {
    x: margin, y, size: 11, font: helv, color: ink,
  });
  y -= 16;
  page.drawText(`Date: ${timestampUtc}`, {
    x: margin, y, size: 11, font: helv, color: ink,
  });
  y -= 24;

  // Body sections
  drawHeading('1. CONFIDENTIAL INFORMATION', 11);
  drawParagraph(
    'Recipient may receive non-public information including partnership tiers, financial projections, founding partner identities, launch plans, and research materials. Recipient agrees to keep this information confidential and not share it with third parties without written permission from the Foundation.'
  );

  drawHeading('2. PERMITTED USE', 11);
  drawParagraph(
    'Recipient may share confidential information with their own legal counsel, financial advisors, and authorized officers strictly for the purpose of evaluating partnership.'
  );

  drawHeading('3. EXCLUSIONS', 11);
  drawParagraph(
    'This agreement does not cover information already publicly available or information independently developed by the Recipient.'
  );

  drawHeading('4. TERM', 11);
  drawParagraph('This agreement remains in effect for two (2) years from the date of signing.');

  drawHeading('5. GOVERNING LAW', 11);
  drawParagraph('This agreement is governed by the laws of the State of Delaware, USA.');

  drawParagraph(
    'By checking the acceptance box on the butterfly.one access form, Recipient agreed to be bound by this agreement in the same manner as a signed paper document.'
  );

  // Signature block
  y -= 8;
  drawHeading('Electronic signature', 11);
  page.drawText(`Signed electronically by: ${fullName}`, { x: margin, y, size: 11, font: helv, color: ink }); y -= 14;
  page.drawText(`Organization: ${organization}`, { x: margin, y, size: 11, font: helv, color: ink }); y -= 14;
  page.drawText(`IP address: ${ipAddress}`, { x: margin, y, size: 11, font: helv, color: ink }); y -= 14;
  page.drawText(`Timestamp: ${timestampUtc}`, { x: margin, y, size: 11, font: helv, color: ink }); y -= 14;

  return pdf.save();
}
