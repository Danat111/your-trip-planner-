import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "./ui/Section";
import { Button } from "./ui/Button";
import { secureApiClient } from "../lib/api-integration/secure-api-client";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const TripPlanner: React.FC = () => {
  const { t } = useTranslation();
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("medium");
  const [interests, setInterests] = useState({
    nature: false,
    culture: false,
    food: false,
    adventure: false,
    history: false,
    shopping: false,
    relaxation: false,
    nightlife: false
  });
  const [travelStyle, setTravelStyle] = useState("balanced");
  const [accommodationType, setAccommodationType] = useState("hotel");
  const [loading, setLoading] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(false);
  const [tripPlan, setTripPlan] = useState<any>(null);

  const handleInterestChange = (interest: string) => {
    setInterests(prev => ({
      ...prev,
      [interest as keyof typeof prev]: !prev[interest as keyof typeof prev]
    }));
  };

  const handleGeneratePlan = async () => {
    if (!destination || !startDate || !endDate) {
      alert(t("tripPlanner.fillFields"));
      return;
    }

    setLoading(true);

    try {
      const selectedInterests = Object.entries(interests)
        .filter(([_, selected]) => selected)
        .map(([interest]) => interest);

      const result = await secureApiClient.generateTripPlan({
        destination,
        startDate,
        endDate,
        budget,
        interests: selectedInterests,
        travelStyle,
        accommodation: accommodationType
      });

      if (result.success) {
        setTripPlan(result.data);
        setPlanGenerated(true);
      } else {
        alert(t("tripPlanner.error"));
      }
    } catch (error) {
      console.error("Error generating trip plan:", error);
      alert(t("tripPlanner.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section variant="default" spacing="xl" id="trip-planner"
      style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url("/images/trip-planner-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("tripPlanner.title")}</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t("tripPlanner.subtitle")}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-2xl font-semibold mb-6">{t("tripPlanner.detailsTitle")}</h3>

          <div className="space-y-6">
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                {t("tripPlanner.destination")}
              </label>
              <input
                type="text"
                id="destination"
                placeholder={t("tripPlanner.destinationPlaceholder")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("tripPlanner.startDate")}
                </label>
                <input
                  type="date"
                  id="start-date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("tripPlanner.endDate")}
                </label>
                <input
                  type="date"
                  id="end-date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                {t("tripPlanner.budget")}
              </label>
              <select
                id="budget"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="budget">{t("tripPlanner.budgetOptions.budget")}</option>
                <option value="medium">{t("tripPlanner.budgetOptions.medium")}</option>
                <option value="luxury">{t("tripPlanner.budgetOptions.luxury")}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("tripPlanner.interests")}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(interests).map(([interest, selected]) => (
                  <div key={interest} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`interest-${interest}`}
                      checked={selected}
                      onChange={() => handleInterestChange(interest)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`interest-${interest}`} className="ml-2 text-sm text-gray-700">
                      {t(`interestsList.${interest}`)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="travel-style" className="block text-sm font-medium text-gray-700 mb-1">
                {t("tripPlanner.travelStyle")}
              </label>
              <select
                id="travel-style"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value)}
              >
                <option value="relaxed">{t("tripPlanner.travelStyles.relaxed")}</option>
                <option value="balanced">{t("tripPlanner.travelStyles.balanced")}</option>
                <option value="active">{t("tripPlanner.travelStyles.active")}</option>
              </select>
            </div>

            <div>
              <label htmlFor="accommodation-type" className="block text-sm font-medium text-gray-700 mb-1">
                {t("tripPlanner.accommodation")}
              </label>
              <select
                id="accommodation-type"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={accommodationType}
                onChange={(e) => setAccommodationType(e.target.value)}
              >
                <option value="hotel">{t("tripPlanner.accommodationTypes.hotel")}</option>
                <option value="hostel">{t("tripPlanner.accommodationTypes.hostel")}</option>
                <option value="apartment">{t("tripPlanner.accommodationTypes.apartment")}</option>
                <option value="resort">{t("tripPlanner.accommodationTypes.resort")}</option>
              </select>
            </div>

            <Button
              onClick={handleGeneratePlan}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? t("tripPlanner.generating") : t("tripPlanner.generate")}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center"
        >
          {planGenerated && tripPlan ? (
            <div className="bg-white rounded-xl shadow-lg p-6 w-full">
              <h3 className="text-2xl font-semibold mb-4">{t("tripPlanner.resultTitle")}</h3>
              <div className="mb-4">
                <h4 className="text-lg font-medium text-blue-700">
                  {tripPlan.destination?.name}
                </h4>
                <p className="text-gray-600">
                  {new Date(tripPlan.dates?.start).toLocaleDateString()} - {new Date(tripPlan.dates?.end).toLocaleDateString()}
                </p>
                {tripPlan.aiPlan?.summary && (
                  <p className="text-gray-700 mt-2">{tripPlan.aiPlan.summary}</p>
                )}
              </div>
              <div className="space-y-4 mb-6">
                {tripPlan.aiPlan?.days?.map((day: any) => (
                  <div key={day.day} className="border-l-4 border-blue-500 pl-4">
                    <h5 className="font-medium">
                      {t("tripPlanner.day")} {day.day} — {day.title}
                    </h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>🌅 {day.morning}</li>
                      <li>☀️ {day.afternoon}</li>
                      <li>🌙 {day.evening}</li>
                      {day.estimatedCost && <li className="text-gray-500">💰 {day.estimatedCost}</li>}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <Button variant="outline">{t("tripPlanner.save")}</Button>
                <Button>{t("tripPlanner.view")}</Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <img
                src="/images/trip-planner.jpg"
                alt="Trip Planner"
                className="w-64 h-64 object-contain mx-auto mb-6"
              />
              <h3 className="text-2xl font-semibold mb-2">{t("tripPlanner.emptyStateTitle")}</h3>
              <p className="text-gray-600 mb-4">
                {t("tripPlanner.emptyStateDesc")}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{t("tripPlanner.tag1")}</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{t("tripPlanner.tag2")}</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{t("tripPlanner.tag3")}</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </Section>
  );
};

export default TripPlanner;
