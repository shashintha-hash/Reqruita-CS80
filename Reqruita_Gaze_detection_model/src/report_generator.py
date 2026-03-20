class ReportGenerator:
    def __init__(self):
        self.total_checks = 0
        self.center_count = 0
        self.left_count = 0
        self.right_count = 0

    def update(self, label):
        self.total_checks += 1

        if label == "CENTER":
            self.center_count += 1
        elif label == "LEFT":
            self.left_count += 1
        elif label == "RIGHT":
            self.right_count += 1

    def generate_report(self):
        if self.total_checks == 0:
            return {"error": "No data"}

        focus_percentage = (self.center_count / self.total_checks) * 100

        return {
            "total_checks": self.total_checks,
            "center": self.center_count,
            "left": self.left_count,
            "right": self.right_count,
            "focus_percentage": round(focus_percentage, 2),
            "status": "GOOD" if focus_percentage > 70 else "SUSPICIOUS"
        }