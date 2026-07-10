import { useCallback, useState } from "react";
import { researchCompany, validateCompany } from "../services/api";

export function useResearch() {
  const [research, setResearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [invalidCompany, setInvalidCompany] = useState(false);

  const analyze = useCallback(async (company) => {
    const trimmedCompany = company.trim();

    if (!trimmedCompany) {
      setError("Enter a company name to begin.");
      return null;
    }

    setLoading(true);
    setError("");
    setInvalidCompany(false);

    try {
      const isValid = await validateCompany(trimmedCompany);
      if (!isValid) {
        setInvalidCompany(true);
        setLoading(false);
        return null;
      }

      const data = await researchCompany(trimmedCompany);
      setResearch(data);
      return data;
    } catch (requestError) {
      const message = "Unable to analyze company. Please try again.";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearInvalidCompany = useCallback(() => {
    setInvalidCompany(false);
  }, []);

  return { research, loading, error, analyze, invalidCompany, clearInvalidCompany };
}
