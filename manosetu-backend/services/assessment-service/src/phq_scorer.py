from typing import Dict, Tuple

class ClinicalScoringEngine:
    @staticmethod
    def evaluate_phq2(responses: Dict[str, int]) -> Tuple[int, bool]:
        """
        Processes PHQ-2 Screening metrics.
        Threshold: Total score >= 3 implies borderline risk requiring immediate full-scale escalation.
        """
        total_score = sum(responses.values())
        requires_deep_screening = total_score >= 3
        return total_score, requires_deep_screening

    @staticmethod
    def evaluate_phq9(responses: Dict[str, int]) -> Tuple[int, str, bool]:
        """
        Processes full-length PHQ-9 Clinical assessments.
        Threshold >= 10 logs a major depressive clinical indicator, triggering an immediate priority counselor alert.
        """
        total_score = sum(responses.values())
        
        # Clinical Depression Severity Bands mapping
        if total_score >= 20:
            severity = "Severe Depression"
        elif total_score >= 15:
            severity = "Moderately Severe Depression"
        elif total_score >= 10:
            severity = "Moderate Depression"
        elif total_score >= 5:
            severity = "Mild Depression"
        else:
            severity = "Minimal Depression"
            
        # Severe classification triggers immediate near-instant dispatch routing protocols
        should_alert_counselor = total_score >= 10
        return total_score, severity, should_alert_counselor