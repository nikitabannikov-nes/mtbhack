package com.mtb.game.service;

import com.mtb.game.config.GameProperties;
import com.mtb.game.domain.MockEventLog;
import com.mtb.game.domain.User;
import com.mtb.game.domain.UserProfile;
import com.mtb.game.domain.enums.TaskEventType;
import com.mtb.game.dto.response.ProfileResponse;
import com.mtb.game.dto.response.MockEventResponse;
import com.mtb.game.exception.ApiException;
import com.mtb.game.repository.MockEventLogRepository;
import com.mtb.game.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class MockBankingService {

    private final MockEventLogRepository mockEventLogRepository;
    private final UserProfileRepository profileRepository;
    private final TaskService taskService;
    private final GameProperties gameProperties;
    private final ProfileService profileService;

    @Transactional
    public MockEventResponse mockSpend(User user, BigDecimal amount) {
        checkAndIncrement(user, "SPEND");
        taskService.trackEvent(user, TaskEventType.SPEND);

        UserProfile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> ApiException.notFound("Profile not found"));
        profile.setMonthlySpend(profile.getMonthlySpend().add(amount));
        profileService.applyProgression(profile);
        profileRepository.save(profile);

        return buildResponse(user, "SPEND");
    }

    @Transactional
    public MockEventResponse mockTransfer(User user, BigDecimal amount) {
        checkAndIncrement(user, "TRANSFER");
        taskService.trackEvent(user, TaskEventType.TRANSFER);
        return buildResponse(user, "TRANSFER");
    }

    @Transactional
    public MockEventResponse mockLogin(User user) {
        checkAndIncrement(user, "LOGIN");
        taskService.trackEvent(user, TaskEventType.LOGIN);
        return buildResponse(user, "LOGIN");
    }

    @Transactional
    public ProfileResponse mockReferral(User user, String referralCode) {
        UserProfile referrerProfile = profileRepository.findByReferralCode(referralCode.trim().toUpperCase())
                .orElseThrow(() -> ApiException.notFound("Referral code not found"));

        if (referrerProfile.getUser().getId().equals(user.getId())) {
            throw ApiException.badRequest("You cannot use your own referral code");
        }

        taskService.trackEvent(referrerProfile.getUser(), TaskEventType.REFERRAL_SIGNUP);
        return profileService.getProfile(referrerProfile.getUser());
    }

    private void checkAndIncrement(User user, String eventType) {
        int cap = gameProperties.getMock().getDailyEventCap();
        LocalDate today = LocalDate.now();

        MockEventLog log = mockEventLogRepository
                .findByUserIdAndEventTypeAndEventDate(user.getId(), eventType, today)
                .orElseGet(() -> MockEventLog.builder()
                        .user(user)
                        .eventType(eventType)
                        .eventDate(today)
                        .count(0)
                        .build());

        if (log.getCount() >= cap) {
            throw ApiException.unprocessable("DAILY_CAP_REACHED",
                    "Daily cap of " + cap + " events reached for " + eventType);
        }

        log.setCount(log.getCount() + 1);
        mockEventLogRepository.save(log);
    }

    private MockEventResponse buildResponse(User user, String eventType) {
        int cap = gameProperties.getMock().getDailyEventCap();
        int count = mockEventLogRepository
                .findByUserIdAndEventTypeAndEventDate(user.getId(), eventType, LocalDate.now())
                .map(MockEventLog::getCount).orElse(0);
        return new MockEventResponse(eventType, count, cap);
    }
}
